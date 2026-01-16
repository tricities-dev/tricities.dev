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
	let daysUntilEvent:number = 0;

	// Length of the description check
	let descriptionLength:number = 200;

	// Calculate days until event
	function getDaysUntil(eventDate: Date): number {
		const now = new Date();
		const diff = eventDate.getTime() - now.getTime();
		return Math.ceil(diff / (1000 * 60 * 60 * 24));
	}

	onMount(async () => {
		try {
			const res = await fetch('https://meetup-scrapper.mackenly.workers.dev/api/tridev/latest', {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			const data = await res.json();
			name = data.name;
			description = data.description;
			shortDescription = buildShortDesc(data.description, descriptionLength);
			featuredImage = data.featuredImage.length ? data.featuredImage : 'https://secure.meetupstatic.com/photos/event/e/0/1/c/clean_503817372.webp';
			date = new Date(data.date);
			href = data.href;
			daysUntilEvent = getDaysUntil(date);
		} catch (error) {
			console.error('Failed to fetch meetup data:', error);
			// Fallback to default values when API is not available
			name = 'TriDev Monthly Meetup';
			description = 'Join us for our monthly software development meetup! We discuss the latest trends in technology, share knowledge, and connect with fellow developers in the Tri-Cities area.';
			shortDescription = buildShortDesc(description, descriptionLength);
			featuredImage = 'https://secure.meetupstatic.com/photos/event/e/0/1/c/clean_503817372.webp';
			// Set to second Tuesday of current month at 6:00 PM
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = currentDate.getMonth();
			const secondTuesday = new Date(year, month, 1);
			secondTuesday.setDate(secondTuesday.getDate() + (2 - secondTuesday.getDay() + 7) % 7 + 7);
			secondTuesday.setHours(18, 0, 0, 0);
			date = secondTuesday;
			href = 'https://www.meetup.com/tridev/';
			daysUntilEvent = getDaysUntil(date);
		}
	});
</script>

<div class="breakout hero">
	<div class="hero-img">
		<img src={ featuredImage } alt="TriDev Meetup Talk" />
	</div>
	<div class="hero-content">
		<p class="hero-social-proof">Join 100+ developers in the Tri-Cities</p>
		<h1 class="hero-content-event-name">
			{name}
		</h1>
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
			{#if daysUntilEvent > 0 && daysUntilEvent <= 14}
				<span class="urgency-badge">
					{#if daysUntilEvent === 1}
						Tomorrow!
					{:else}
						In {daysUntilEvent} days
					{/if}
				</span>
			{/if}
		</p>
		<div class="hero-cta-group">
			<CtaLink title="RSVP on Meetup" link="{href}" icon="meetup"/>
			<CtaLink title="Join Discord" link="https://discord.gg/B3JAaXvkCt" icon="discord"/>
		</div>
		<p class="hero-subtext">Free to attend. All skill levels welcome.</p>
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
		height: auto;
		min-height: 34.25rem;
		background: var(--gradient-bg-vert);
		border: 2px solid var(--border-color);
		border-radius: 10px;
		z-index: 1;
		clip-path: polygon(0% 0%, var(--top-end-hero) 0%, 100% 5rem, 100% 100%, 0% 100%);
		padding: 2rem;
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
		width: min(32rem, 100%);
		height: auto;
		aspect-ratio: 1/1;
		background-color: transparent;
		z-index: 1;
		border-radius: 10px 0 10px 0;
		overflow: hidden;
	}

	.hero-img > img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.hero-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: flex-start;
		gap: 1rem;
		height: auto;
		padding: 0 5rem 0 4rem;
		z-index: 1;
	}

	.hero-content-event-name {
		font-family: var(--header-font-family);
		font-size: clamp(2rem, 5vw, 3rem);
		color: var(--primary-text-color);
		line-height: 1.2;
	}

	.hero-content-date {
		font-family: var(--body-font-family);
		color: var(--primary-text-color);
		font-size: clamp(1rem, 2vw, 1.25rem);
		line-height: 1.6;
	}

	.hero-content-date a {
		color: var(--cta-btn-bg);
	}

	.hero-content-description {
		font-family: var(--body-font-family);
		color: var(--primary-text-color);
		font-size: clamp(1rem, 2vw, 1.25rem);
		line-height: 1.6;
	}

	.hero-social-proof {
		font-family: var(--body-font-family);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--cta-btn-bg);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0;
	}

	.hero-cta-group {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	.hero-subtext {
		font-family: var(--body-font-family);
		font-size: 0.875rem;
		color: var(--secondary-text-color);
		margin: 0;
		opacity: 0.8;
	}

	.urgency-badge {
		display: inline-block;
		background: var(--cta-btn-bg);
		color: var(--cta-btn-fg);
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		margin-left: 0.5rem;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}

	@media only screen and (max-width: 1366px) {
		.hero {
			gap: 1rem;
			padding: 1.5rem;
		}

		.hero-img {
			width: min(24rem, 100%);
		}

		.hero-content {
			padding: 0 1.5rem;
		}
	}

	@media only screen and (max-width: 768px) {
		.hero {
			flex-direction: column;
			align-items: center;
			padding: 1rem;
		}

		.hero-content {
			padding: 1rem;
			align-items: center;
			text-align: center;
		}

		.hero-img {
			border-radius: 10px;
		}

		.hero-cta-group {
			justify-content: center;
		}
	}

	@media only screen and (max-width: 430px) {
		.hero {
			gap: 1rem;
			height: auto;
			padding: 0;
			border: none;
			z-index: 0;
			clip-path: none;
		}

		.hero-bg-img {
			background-image: none;
		}

		.hero-img {
			width: 100%;
			border-radius: 0;
		}

		.hero-content {
			padding: 1rem;
		}
	}
</style>
