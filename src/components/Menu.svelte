<script lang="ts">
	import type { Link } from '../types/menu.types';
	import { menuStore } from '../stores';
	import { fly } from 'svelte/transition';

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
	.nav-menu {
		position: relative;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		justify-self: center;
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
</style>
