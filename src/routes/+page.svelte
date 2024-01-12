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
			<FeedContainer title="On Discord" id="on-discord" className="feed-container" zIndex={ 1 }>
				<a class="discord-join" href="https://discord.gg/B3JAaXvkCt">
					<h2>Join us!</h2>
				</a>
			</FeedContainer>
			<FeedContainer title="Sponsors" id="sponsors" className="feed-container" zIndex={ 0 }>
				<a href="https://bitsum.com/">
					<img src="bitsum-logo-dark.webp" alt="Bitsum" />
				</a>
				<a href="https://sparkplaza.com">
					<img src="Spark-Plaza-logo-refresh-horizontal-2018-white.png" alt="Bitsum" />
				</a>
				<a href="https://www.teksystems.com/">
					<img src="teksystems-logo-white.png" alt="TekSystems" />
				</a>
				<a href="https://dotnetfoundation.org/">
					<img src="dotnet.svg" alt="The .NET Foundation" />
				</a>
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
		color: white;
		text-align: center;
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

	@media only screen and (max-width: 430px) {
		section {
			width: 100%;
			height: auto;
		}

		aside {
			width: 100%;
			height: auto;
		}
	}
</style>
