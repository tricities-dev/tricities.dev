<script lang="ts">
	import { flip } from 'svelte/animate';
	import { onDestroy } from 'svelte';
	import { config } from '../stores.js';

	export let data: Array<any>;
	export let cssClass: string = '';
	export let speed = 500;
	export let autoplay = true;
	export let autoplaySpeed = 5000;

	let sponsors: Array<Sponsor> = data;
	let interval: any;

	interface Sponsor {
		id: string;
		name: string;
		description: string;
		link: string;
		logoDark: string;
		logoLight: string;
	}

	const rotateLeft = (e) => {
		const transitioningImage: Sponsor = sponsors[sponsors.length - 1];
		// set opacity style of transitioning image to 0
		document.getElementById(transitioningImage.id).style.opacity = '0';
		sponsors = [sponsors[sponsors.length - 1], ...sponsors.slice(0, sponsors.length - 1)];
		setTimeout(() => (document.getElementById(transitioningImage.id).style.opacity = '1'), speed);
	};

	const rotateRight = (e) => {
		const transitioningImage: Sponsor = sponsors[0];
		document.getElementById(transitioningImage.id).style.opacity = '0';
		sponsors = [...sponsors.slice(1, sponsors.length), sponsors[0]];
		setTimeout(() => (document.getElementById(transitioningImage.id).style.opacity = '1'), speed);
	};

	const startAutoPlay = () => {
		if (autoplay) {
			interval = setInterval(rotateRight, autoplaySpeed);
		}
	};

	const stopAutoPlay = () => {
		clearInterval(interval);
	};

	if (autoplay) {
		startAutoPlay();
	}

	onDestroy(() => {
		stopAutoPlay();
	});
</script>

<style lang="scss">
	// todo move to variables.scss
	$white: #fff;
	$black: #000;

	.carousel-container {
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
		border: 1px solid $white;

        h2 {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 1rem;
            font-weight: 600;
            margin: 0;
            padding-top: 20px;
            text-align: center;
        }

		ul {
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			list-style: none;
			padding-left: 0;
			-webkit-mask: linear-gradient(to right, rgba(0, 0, 0, 0.50), black 40%, black 60%, rgba(0, 0, 0, 0.50));
            mask: linear-gradient(to right, rgba(0, 0, 0, 0.50), black 40%, black 60%, rgba(0, 0, 0, 0.50));

			img {
				width: 200px;
				margin: 0 28px;
				padding: 0 20px;
			}
		}

        &.light-mode {
			border: 1px solid $black;
			color: $black;
		}
	}
</style>

<div class="carousel-container {$config.screenMode} {cssClass}">
    <h2>Sponsors</h2>
	<ul id="carousel-sponsors">
		{#each sponsors as sponsor (sponsor.id)}
			<li animate:flip={{ duration: 500 }}>
                <a href={sponsor.link} target="_blank" rel="noreferrer noopener">
                    {#if $config.screenMode == 'light-mode'}
                        <img src={sponsor.logoLight} alt={sponsor.id} title={sponsor.name} id={sponsor.id} />
                    {:else}
                        <img src={sponsor.logoDark} alt={sponsor.id} title={sponsor.name} id={sponsor.id} />
                    {/if}
                </a>
            </li>
		{/each}
	</ul>
</div>