<script lang="ts">
	import { menuStore } from '../stores';
	import { fly, scale } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	type Link = {
		title: string,
		link: string,
	}

	const links:Link[] = [
		{
			title: 'Member Feed',
			link: '#member-feed',
		},
		{
			title: 'On Discord',
			link: '#on-discord',
		},
		{
			title: 'Our Sponsors',
			link: '#sponsors',
		}
	]
</script>

{#if $menuStore}
	<div class="nav-menu"
		class:glass={$menuStore}
		transition:fly={{ y: -15, delay: 0 }}
	>
		{#each links as link, i}
			<a transition:fly={{ y: -15, delay: 50 * i }} href={link.link}>
				{ link.title }
			</a>
		{/each}
	</div>
{/if}

<style>
	div {
		position: fixed;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		top: var(--nav-height);
		width: 100%;
		height: auto;
		font-size: 1.5em;
		font-family: var(--body-font-family);
		letter-spacing: 0.15em;
		padding: 1em;
		padding-top: 0;
		transition: ease-in-out .5s;
		z-index: 100;
	}

	a {
		cursor: pointer;
		width: max-content;
		margin: 1rem auto;
		text-decoration: none;
		color: var(--primary-text-color);
	}

	a:hover {
		text-decoration: underline;
	}

	.glass {
		/* From https://css.glass */
		background: var(--glass-bg);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(9.5px);
		-webkit-backdrop-filter: blur(9.5px);
		transition: ease-in-out .5s;
	}
</style>
