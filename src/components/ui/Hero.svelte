<script lang="ts">
	import { onMount } from 'svelte';
	import CtaLink from "./CtaLink.svelte";

	import { dateFormat } from '../../utils/date.utils';
	import { buildShortDesc } from '../../utils/feed.utils';

	let name:string = '';
	let description:string = '';
	let shortDescription:string = '';
	let featuredImage:string = '';
	let date:Date = new Date();
	let href:string = '';

	// Length of the description check
	let descriptionLength:number = 200;

	onMount(async () => {
		const res = await fetch('https://meetup-scrapper.mackenly.workers.dev/api/tridev/latest', {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const data = await res.json();
		name = data.name;
		description = data.description;
		shortDescription = buildShortDesc(data.description, descriptionLength);
		featuredImage = data.featuredImage.length ? data.featuredImage : 'https://secure.meetupstatic.com/photos/event/e/0/1/c/clean_503817372.webp';
		date = new Date(data.date);
		href = data.href;
	});
</script>

<div class="breakout hero">
	<div class="hero-img">
		<img src={featuredImage} alt="TriDev Meetup Talk" />
	</div>
	<div class="hero-content">
		<h2 class="hero-content-event-name">
			{name}
		</h2>
		<p class="hero-content-description">
			{#if description.length > descriptionLength }
				{ shortDescription }...
			{:else}
				{ description }
			{/if}
		</p>
		<p class="hero-content-date">
			{ dateFormat(date) }
			{' '} at <a href="https://maps.app.goo.gl/PgLg6EsQCxe9hAn4A" target="_blank">Spark Plaza</a>
		</p>
		<CtaLink title="RSVP" link="{href}" icon="meetup"/>
	</div>
	<div class="hero-bg-img"></div>
</div>

<style>
	.hero {
		--top-end-hero: calc(100% - 5rem);

		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		gap: 2rem;
		height: 34.25rem;
		background: var(--gradient-bg-vert);
		border: 2px solid var(--border-color);
		border-radius: 10px;
		z-index: 1;
		clip-path: polygon(0% 0%, var(--top-end-hero) 0%, 100% 5rem, 100% 100%, 0% 100%);
	}

	.hero-bg-img {
		position: absolute;
		opacity: var(--triforce-opacity);
		width: 100%;
		height: 100%;
		background-image: url('./triforce.svg');
		background-repeat: no-repeat;
		background-position: right center;
		filter: var(--triforce-invert);
	}

	.hero-img {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 32rem;
		height: 32rem;
		background-color: var(--gray);
		z-index: 1;
		border-radius: 10px 0 10px 0;
		overflow: hidden;
	}

	.hero-img > img {
		height: 32rem;
		width: auto;
	}

	.hero-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: flex-start;
		gap: 1rem;
		height: 32rem;
		padding: 0 5rem 0 4rem;
		z-index: 1;
	}

	.hero-content-event-name {
		font-family: var(--header-font-family);
		font-size: 3rem;
		color: var(--primary-text-color);
	}

	.hero-content-date {
		font-family: var(--body-font-family);
		color: var(--primary-text-color);
		font-size: 1.25rem;
		line-height: 1.6;
	}

	.hero-content-date a {
		color: var(--cta-btn-bg);
	}

	.hero-content-description {
		font-family: var(--body-font-family);
		color: var(--primary-text-color);
		font-size: 1.25rem;
		line-height: 1.6;
	}

	@media only screen and (max-width: 1366px) {
		.hero {
			gap: 1rem;
		}

		.hero-img {
			width: 24rem;
			height: 32rem;
			background-color: var(--gray);
			z-index: 1;
			border-radius: 10px 0 0 0;
		}

		.hero-content {
			padding: 0rem 1.5rem 0 1.5rem;
		}
	}

	@media only screen and (max-width: 430px) {
	.hero {
		gap: 2rem;
		height: auto;
		padding: 0rem;
		border: none;
		z-index: 0;
		clip-path: polygon(0% 0%, 100% 0%, 100% 0, 100% 100%, 0% 100%);
	}

	.hero-bg-img {
		background-image: none;
	}

	.hero-img {
		width: 100%;
		height: auto;
		aspect-ratio: 1/1;
		border-radius: 0;
	}

	.hero-content {
		padding: 0 1rem 0 1rem;
	}

	.hero-content-event-name {
		font-size: 2.5rem;
	}
}
</style>
