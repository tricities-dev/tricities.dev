<script lang="ts">
	import Hero from "../components/ui/Hero.svelte";
	import FeedContainer from "../components/ui/FeedContainer.svelte";
	import MemberFeed from "../components/memberFeed/MemberFeed.svelte";
</script>

<main class="full-width content-grid">
	<Hero />
	<div class="breakout main-content">
		<section>
			<FeedContainer title="Member Feed" id="member-feed" className="feed-container member-feed" zIndex={ 0 }>
				<MemberFeed />
			</FeedContainer>
		</section>
		<aside>
			<FeedContainer title="" id="on-discord" className="feed-container discord-container" zIndex={ 1 }>
				<div class="discord-card">
					<div class="discord-header">
						<img src="discord.svg" alt="Discord" width="40" height="40" />
						<span class="discord-badge">Active Community</span>
					</div>
					<h3 class="discord-title">Stay Connected</h3>
					<p class="discord-description">Get help with code, share projects, find job opportunities, and chat with local devs between meetups.</p>
					<ul class="discord-benefits">
						<li>Ask questions anytime</li>
						<li>Job & project opportunities</li>
						<li>Event announcements first</li>
					</ul>
					<a class="discord-cta" href="https://discord.gg/B3JAaXvkCt" target="_blank" rel="noopener">
						Join the Discord Server
					</a>
				</div>
			</FeedContainer>
			<FeedContainer title="Sponsors" id="sponsors" className="feed-container" zIndex={ 0 }>
				<div class="sponsors-grid">
					<a href="https://bitsum.com/">
						<img src="bitsum-logo-dark.webp" alt="Bitsum" />
					</a>
					<a href="https://sparkplaza.com">
						<img src="Spark-Plaza-logo-refresh-horizontal-2018-white.png" alt="Spark Plaza" />
					</a>
					<a href="https://dotnetfoundation.org/">
						<img src="dotnet.svg" alt="The .NET Foundation" />
					</a>
				</div>
			</FeedContainer>
		</aside>
	</div>
</main>

<style>
	main {
		height: 100%;
		row-gap: 2rem;
		padding-top: 7rem;
		background-color: var(--primary-bg-color);
	}

	/* Discord Card Styles */
	.discord-card {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		gap: 0.75rem;
	}

	.discord-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.discord-badge {
		font-family: var(--body-font-family);
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: #5865F2;
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}

	.discord-title {
		font-family: var(--header-font-family);
		font-size: 1.5rem;
		color: var(--primary-text-color);
		margin: 0;
	}

	.discord-description {
		font-family: var(--body-font-family);
		font-size: 0.9rem;
		color: var(--secondary-text-color);
		line-height: 1.5;
		margin: 0;
	}

	.discord-benefits {
		list-style: none;
		padding: 0;
		margin: 0.5rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.discord-benefits li {
		font-family: var(--body-font-family);
		font-size: 0.85rem;
		color: var(--primary-text-color);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.discord-benefits li::before {
		content: "\2713";
		color: #5865F2;
		font-weight: bold;
	}

	.discord-cta {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: #5865F2;
		color: white;
		font-family: var(--body-font-family);
		font-weight: 700;
		font-size: 0.9rem;
		text-decoration: none;
		border-radius: 8px;
		margin-top: 0.5rem;
		transition: all 0.2s ease-in-out;
	}

	.discord-cta:hover {
		background: #4752C4;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(88, 101, 242, 0.4);
	}

	.main-content {
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap-reverse;
		justify-content: flex-start;
		align-items: flex-end;
		gap: 2rem;
		width: 100%;
		height: auto;
		z-index: 0;
	}

	section {
		flex: 1;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
	}

	aside {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		width: 25rem;
	}
	
	/* Sponsor styles */
	:global(#sponsors .feed-content) {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	
	:global(#sponsors .feed-content a) {
		display: flex;
		justify-content: center;
		width: 100%;
		margin: 0.75rem 0;
	}
	
	:global(#sponsors .feed-content img) {
		max-width: 100%;
		height: auto;
		object-fit: contain;
	}

	.sponsors-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1.5rem;
		width: 100%;
		padding: 1rem;
		place-items: center;
		place-content: center;
	}

	.sponsors-grid a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 200px;
		padding: 0.5rem;
	}

	.sponsors-grid img {
		width: 100%;
		height: auto;
		object-fit: contain;
	}

	@media only screen and (max-width: 430px) {
		section {
			width: 100%;
			height: auto;
		}

		aside {
			width: 100%;
			height: auto;
		}
		
		:global(#sponsors .feed-content img) {
			max-width: 90%;
		}

		.sponsors-grid {
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
			gap: 1rem;
			padding: 0.5rem;
		}
	}
</style>
