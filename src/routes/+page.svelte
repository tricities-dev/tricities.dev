<script>
	// iport link from './link.svelte';
	import Link from '../components/link.svelte';
	import Links from '../components/links.svelte';
	import Logo from '../components/logo.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let onLoad = false;

	onMount(() => {
		setTimeout(() => (onLoad = true), 50);
	});
</script>

<!-- full page div making the whole screen dark mode -->
<div class="dark-mode">
	<!-- { onload &&
        <div class="main-container" transition:fade>
            <Logo/>
            <Link text="Meetup" link="http://meetup.com/TriDev" />
        </div>
    } -->

	{#if onLoad}
		<div class="main-container" transition:fade>
			<Logo />
			<Links>
				<Link text="Meetup" link="http://meetup.com/TriDev" icon="meetup.svg" />
				<Link text="On Discord" link="http://meetup.com/TriDev" icon="discord.svg" />
			</Links>
		</div>
	{/if}
</div>

<style lang="scss">
	.dark-mode {
		// a full screen overlay with a black background
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 1);
		color: white;
	}

	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
