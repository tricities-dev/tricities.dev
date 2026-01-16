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
			title: 'The Meetup',
			link: 'https://meetup.com/tridev'
		},
		{
			title: 'On Discord',
			link: 'https://discord.gg/B3JAaXvkCt',
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
		padding-top: 0.5em;
		padding-bottom: 1.5em;
		transition: ease-in-out .5s;
		z-index: 100;
		overflow-x: hidden;
		text-align: center;
	}

	a {
		cursor: pointer;
		width: 100%;
		max-width: 90%;
		margin: 1rem auto;
		text-decoration: none;
		color: var(--primary-text-color);
		overflow-wrap: break-word;
		word-wrap: break-word;
		word-break: break-word;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
