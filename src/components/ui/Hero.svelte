<script lang="ts">
	import { onMount } from 'svelte';
	import CtaLink from "./CtaLink.svelte";

	let name = '', description = '', date = new Date(), href = '';

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
		date = new Date(data.date);
		console.log(data.date);
		href = data.href;
	});
</script>

<div class="hero">
	<div class="hero-img">
	</div>
	<div class="hero-content">
		<h2 class="hero-content-event-name">
			{name}
		</h2>
		<p class="hero-content-description">
			{description}
		</p>
		<p class="hero-content-date">
			{
				date.toLocaleDateString('en-US', {
					timeZone: 'America/New_York',
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					hour12: true
				})
			}
			{' '} at <a href="https://maps.app.goo.gl/PgLg6EsQCxe9hAn4A" target="_blank">Spark Plaza</a>
		</p>
		<CtaLink title="RSVP" link="{href}" icon="meetup"/>
	</div>
	<div class="hero-bg-img"></div>
</div>

<style>
	.hero {
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		gap: 2rem;
		width: 100%;
		height: 34.25rem;
		background: var(--gradient-bg-vert);
		border: 2px solid var(--border-color);
		border-radius: 10px;
		z-index: 1;
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

	.hero::after {
		content: "";
		position: absolute;
		right: -56px;
		top: -56px;
		width: 100px;
		height: 100px;
		transform: rotate(45deg);
		background-color: var(--primary-bg-color);
		border: 4px solid var(--primary-bg-color);
	}

	.hero-img {
		width: 32rem;
		height: 32rem;
		background-color: var(--gray);
		z-index: 1;
		border-radius: 10px 0 0 0;
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

		.hero-content {
			padding: 0rem 1.5rem 0 1.5rem;
		}

		.hero::after {
			right: -51px;
			top: -36px;
			width: 95px;
			height: 75px;
		}
	}

	@media only screen and (max-width: 430px) {
	.hero {
		gap: 2rem;
		height: auto;
		padding: 0rem;
		border: none;
		z-index: 0;
	}

	.hero-bg-img {
		background-image: none;
	}

	.hero::after {
		display: none;
	}

	.hero-img {
		width: 100%;
		height: auto;
		aspect-ratio: 1/1;
		border-radius: 0;
	}

	.hero-content {
		padding: 10rem 1rem 0 1rem;
	}
}
</style>
