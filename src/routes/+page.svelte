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
			<FeedContainer title="" id="on-discord" className="feed-container" zIndex={ 1 }>
				<a class="discord-join" href="https://discord.gg/B3JAaXvkCt">
					<img src="discord.svg" alt="Join TriDev on Discord" width="48" height="48" />
					<p>Join TriDev on Discord</p>
				</a>
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

	.discord-join {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 2rem;
		gap: 1rem;
		transition: all 0.2s ease-in-out;
		text-decoration: none;
	}

	.discord-join img {
		width: 64px;
		height: 64px;
		transition: all 0.2s ease-in-out;
	}

	.discord-join p {
		font-family: var(--body-font-family);
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--primary-text-color);
		text-align: center;
		margin: 0;
		transition: all 0.2s ease-in-out;
	}

	.discord-join:hover {
		transform: translateY(-4px);
		background: var(--header-gradient);
		border-radius: 10px;
	}

	.discord-join:hover img {
		transform: scale(1.1);
	}

	.discord-join:hover p {
		color: var(--header-text-color);
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
