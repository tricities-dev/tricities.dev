<script lang="ts">
	import type { memberPosts, memberPost } from '../../types/feed.types';
	import MemberFeedItem from "./MemberFeedItem.svelte";
	import {onMount} from "svelte";


	let memberFeed: memberPosts = [];
	let loading = true;
	let error: string | null = null;
	let usingFallback = false;
	let retryCount = 0;
	const MAX_RETRIES = 3;
	const RETRY_DELAY = 1000; // 1 second

	// Fallback posts for when the RSS function isn't available (dev mode)
	const fallbackPosts: memberPost[] = [
		{
			title: "Want to see your posts here?",
			description: "TriDev members can add their RSS feed to be featured in this community feed. Share your tech articles, tutorials, and insights with the local developer community!",
			postLink: "https://github.com/tricities-dev/tricities.dev",
			siteLink: "https://github.com/tricities-dev/tricities.dev",
			pubDate: new Date()
		},
		{
			title: "Join the TriDev Community",
			description: "Connect with fellow developers in the Tri-Cities area. Share knowledge, find opportunities, and grow together. We meet every 2nd Tuesday at Spark Plaza.",
			postLink: "https://www.meetup.com/tridev/",
			siteLink: "https://www.meetup.com/tridev/",
			pubDate: new Date(Date.now() - 86400000)
		},
		{
			title: "Get Involved on Discord",
			description: "Can't wait until the next meetup? Join our Discord server to chat with members, ask questions, share projects, and stay up to date on events.",
			postLink: "https://discord.gg/B3JAaXvkCt",
			siteLink: "https://discord.gg/B3JAaXvkCt",
			pubDate: new Date(Date.now() - 172800000)
		}
	];

	async function fetchAndParseRSSFeeds(): Promise<memberPost[]> {
		try {
			const response = await fetch('/.netlify/functions/getRssFeeds');
			if (!response.ok) {
				if (response.status === 404 && retryCount < MAX_RETRIES) {
					retryCount++;
					console.log(`Retry ${retryCount} of ${MAX_RETRIES}...`);
					await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
					return fetchAndParseRSSFeeds();
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const text = await response.text();
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(text, "text/xml");
			
			// Even if there are parser errors, try to extract what we can
			const items = xmlDoc.getElementsByTagName('item');
			console.log('Found items:', items.length);
			
			const allPosts: memberPost[] = [];
			Array.from(items).forEach(item => {
				try {
					// Create a temporary div to decode HTML entities
					const decodeHTML = (html: string) => {
						const div = document.createElement('div');
						div.innerHTML = html;
						return div.textContent || '';
					};

					// Extract and decode content
					const title = decodeHTML(item.querySelector('title')?.textContent || '');
					const rawDescription = item.querySelector('description')?.textContent || '';
					const description = decodeHTML(rawDescription.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
					const postLink = item.querySelector('link')?.textContent || '';
					const pubDate = new Date(item.querySelector('pubDate')?.textContent || '');

					// Try to find an image URL
					let imageUrl: string | undefined;
					
					// First try media:content
					const mediaContent = item.querySelector('media\\:content, content');
					if (mediaContent?.getAttribute('url')) {
						imageUrl = mediaContent.getAttribute('url') || undefined;
					}
					
					// If no media:content, try to find an image in the description
					if (!imageUrl && rawDescription) {
						const tempDiv = document.createElement('div');
						tempDiv.innerHTML = rawDescription;
						const firstImage = tempDiv.querySelector('img');
						if (firstImage?.src) {
							imageUrl = firstImage.src;
						}
					}

					// Extract author info from tridev namespace elements
					const author = item.querySelector('tridev\\:author, author')?.textContent || undefined;
					const authorWebsite = item.querySelector('tridev\\:authorWebsite, authorWebsite')?.textContent || undefined;
					const authorTwitter = item.querySelector('tridev\\:authorTwitter, authorTwitter')?.textContent || undefined;

					// Only add items that have at least a title or description
					if (title || description) {
						allPosts.push({
							title,
							description,
							postLink,
							siteLink: authorWebsite || postLink, // Use author website if available
							pubDate: isNaN(pubDate.getTime()) ? new Date() : pubDate, // Use current date if invalid
							imageUrl,
							author,
							authorWebsite,
							authorTwitter
						});
					}
				} catch (itemError) {
					console.warn('Error parsing item:', itemError);
					// Continue with next item
				}
			});

			if (allPosts.length === 0) {
				throw new Error('No valid posts found in the RSS feeds');
			}

			// Sort by date (newest first) and take the 5 newest posts
			return allPosts
				.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
				.slice(0, 5);
		} catch (error) {
			console.error('Error fetching RSS feeds:', error);
			throw error;
		}
	}

	onMount(async () => {
		try {
			memberFeed = await fetchAndParseRSSFeeds();
		} catch (err) {
			console.error('Error fetching RSS feeds:', err);
			// Use fallback posts instead of showing an error
			memberFeed = fallbackPosts;
			usingFallback = true;
		} finally {
			loading = false;
		}
	});
</script>

<div class="member-feed">
	{#if loading}
		<div class="loading-state">
			<div class="loading-spinner"></div>
			<p>Loading member posts...</p>
		</div>
	{:else if memberFeed.length === 0}
		<p>No posts found.</p>
	{:else}
		{#each memberFeed as post}
			<MemberFeedItem title={post.title} postLink={post.postLink} author={post.author} authorWebsite={post.authorWebsite} />
		{/each}
		{#if !usingFallback}
			<div class="contribute-cta">
				<p>Have a tech blog? <a href="https://github.com/tricities-dev/tricities.dev" target="_blank" rel="noopener">Add your RSS feed</a> to be featured here!</p>
			</div>
		{/if}
	{/if}
</div>

<style>
	.member-feed {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		gap: 3rem;
		width: 100%;
		height: auto;
		padding: 2rem 0;
	}

	.loading-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 3px solid var(--border-color);
		border-top-color: var(--cta-btn-bg);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.contribute-cta {
		width: 100%;
		text-align: center;
		padding: 1.5rem;
		border-top: 1px solid var(--border-color);
		margin-top: 1rem;
	}

	.contribute-cta p {
		font-family: var(--body-font-family);
		font-size: 0.9rem;
		color: var(--secondary-text-color);
		margin: 0;
	}

	.contribute-cta a {
		color: var(--cta-btn-bg);
		font-weight: 600;
		text-decoration: none;
	}

	.contribute-cta a:hover {
		text-decoration: underline;
	}

	@media only screen and (max-width: 430px) {
		.member-feed {
			padding: 0;
		}
	}
</style>
