<script lang="ts">
	import type { memberPosts, memberPost } from '../../types/feed.types';
	import MemberFeedItem from "./MemberFeedItem.svelte";
	import {onMount} from "svelte";
	import {themeStore} from "../../stores";

	let memberFeed: memberPosts = [];
	let loading = true;
	let error: string | null = null;
	let retryCount = 0;
	const MAX_RETRIES = 3;
	const RETRY_DELAY = 1000; // 1 second

	async function fetchAndParseRSSFeeds() {
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

					// Only add items that have at least a title or description
					if (title || description) {
						allPosts.push({
							title,
							description,
							postLink,
							siteLink: postLink, // Using post link as site link
							pubDate: isNaN(pubDate.getTime()) ? new Date() : pubDate, // Use current date if invalid
							imageUrl
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
			error = err instanceof Error ? err.message : 'An error occurred while fetching the feeds';
		} finally {
			loading = false;
		}
	});

	// TODO: Build a member RSS feed
</script>

<div class="member-feed">
	{#if loading}
		<p>Loading member posts...</p>
	{:else if error}
		<p class="error">Error: {error}</p>
	{:else if memberFeed.length === 0}
		<p>No posts found.</p>
	{:else}
		{#each memberFeed as post, i}
			<MemberFeedItem title={post.title} description={post.description} postLink={post.postLink} siteLink={post.siteLink} />
		{/each}
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

	.error {
		color: red;
	}

	@media only screen and (max-width: 430px) {
		.member-feed {
			padding: 0;
		}
	}
</style>
