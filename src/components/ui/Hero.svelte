<script lang="ts">
	import { onMount } from 'svelte';
	import CtaLink from "./CtaLink.svelte";

	let title = '', description = '', date = new Date(), link = '';

    onMount(async () => {
        const res = await fetch('https://meetup-scrapper.mackenly.workers.dev/api/tridev/latest', {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});
        const data = await res.json();
        title = data.title;
        description = data.description;
		date = new Date(data.date);
		console.log(data.date);
		link = data.link;
    });
</script>

<div class="hero">
	<div class="hero-body">
		<div class="hero-img">
		</div>
		<div class="hero-content">
			<h2 class="hero-content-title">
				{title}
			</h2>
			<p class="hero-content-description">
				{description}
			</p>
			<p class="hero-content-date">
				{date.toLocaleDateString('en-US', { timeZone: 'America/New_York', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
				{' '} at <a href="https://maps.app.goo.gl/PgLg6EsQCxe9hAn4A" target="_blank">Spark Plaza</a>
			</p>
			<CtaLink title="RSVP" link="{link}" icon="meetup"/>
		</div>
		<div class="hero-bg-img"></div>
	</div>
</div>

<style>
.hero {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	height: 34.25rem;
	z-index: 1;
}

.hero-body {
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	gap: 2rem;
	width: calc(100% - 12rem);
	height: 34.25rem;
	background: var(--gradient-bg-vert);
	border: 2px solid var(--border-color);
}

.hero-bg-img {
	position: absolute;
	opacity: var(--triforce-opacity);
	width: 100%;
	height: 100%;
	background-image: url('./triforce.svg');
  background-repeat: no-repeat;
  background-position: right center;
}

.hero-body::after {
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
}

.hero-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: flex-start;
	gap: 2rem;
	height: 32rem;
	padding: 0 5rem 0 5rem;
	z-index: 1;
}

.hero-content-title {
	font-family: var(--header-font-family);
	font-size: 3rem;
	color: var(--primary-text-color);
}

.hero-content-date {
	font-family: var(--body-font-family);
	color: var(--primary-text-color);
}

.hero-content-date a {
	color: var(--cta-btn-bg);
}

.hero-content-description {
	font-family: var(--body-font-family);
	color: var(--primary-text-color);
	line-height: 1.6rem;
}
</style>
