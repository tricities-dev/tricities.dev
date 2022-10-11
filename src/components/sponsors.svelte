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

	const rotateLeft = () => {
		const transitioningImage: HTMLElement = document.getElementById(sponsors[sponsors.length - 1].id) as HTMLElement;
		// set opacity style of transitioning image to 0
		transitioningImage.style.opacity = '0';
		sponsors = [sponsors[sponsors.length - 1], ...sponsors.slice(0, sponsors.length - 1)];
		setTimeout(() => (transitioningImage.style.opacity = '1'), speed);
	};

	const rotateRight = () => {
		const transitioningImage: HTMLElement = document.getElementById(sponsors[0].id) as HTMLElement;
		transitioningImage.style.opacity = '0';
		sponsors = [...sponsors.slice(1, sponsors.length), sponsors[0]];
		setTimeout(() => (transitioningImage.style.opacity = '1'), speed);
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
		min-height: 300px;
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border: 1px solid $white;

        h2 {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 1rem;
            font-weight: 600;
            margin: 0;
            padding-top: 20px;
            text-align: center;
        }

		button {
			position: absolute;
			top: 47%;
			z-index: 1;
			background: none;
			border: none;
			cursor: pointer;
			outline: none;
			transition: all 0.2s ease-in-out;
			&:hover {
				transform: scale(0.97);
				opacity: 0.9;
			}
			&.left {
				left: 0;
			}
			&.right {
				right: 0;
			}
			svg {
				width: 30px;
				height: 30px;
				fill: $white;

				&.light-mode {
					fill: $black;
				}
			}
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

<div class="carousel-container {$config.screenMode} {cssClass}" on:mouseenter={stopAutoPlay} on:mouseleave={startAutoPlay}>
	<h2>Sponsors</h2>
	<button class="left" on:click={rotateLeft}>
		<svg class="{$config.screenMode}" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="-10 0 64 44">	
			<path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z"/>
		</svg>
	</button>
	<button class="right" on:click={rotateRight}>
		<svg class="{$config.screenMode}" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="-20 0 64 44">
			<path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"/>
		</svg>
	</button>
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