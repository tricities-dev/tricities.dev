<script lang="ts">
	import Hero from "../components/ui/Hero.svelte";
	import FeedContainer from "../components/ui/FeedContainer.svelte";
	import MemberFeed from "../components/memberFeed/MemberFeed.svelte";
	import { onMount } from "svelte";

	// onMount(async () => {
	// 	const response = await fetch('https://meetup-scrapper.mackenly.workers.dev/api/tridev/latest');
	// 	const latest = await response.json()
	//
	// 	console.log(latest)
	// })
</script>

<main class="full-width content-grid">
	<Hero />
	<div class="breakout main-content">
		<section>
			<FeedContainer title="Member Feed" id="member-feed" className="feed-container member-feed" zIndex={0}>
				<MemberFeed />
			</FeedContainer>
		</section>
		<aside>
			<FeedContainer title="On Discord" id="on-discord" className="feed-container" zIndex={1}/>
			<FeedContainer title="Sponsors" id="sponsors" className="feed-container" zIndex={0}/>
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

	.main-content {
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
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
		.main-content {
			margin-top: 10rem;
		}

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
