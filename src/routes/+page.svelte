<script>
	// iport link from './link.svelte';
	import { onMount } from "svelte";
	import { config } from "../stores.js";
	import Link from "../components/link.svelte";
	import Links from "../components/links.svelte";
	import Sponsors from "../components/sponsors.svelte";
	import { sponsors } from "../sponsors.json";
	import Logo from "../components/logo.svelte";

	import { fade } from "svelte/transition";

	let onLoad = false;

	onMount(() => {
		const prefersDarkMode = window.matchMedia(
			"(prefers-color-scheme:dark)"
		).matches;
		prefersDarkMode === false
			? ($config.screenMode = "light-mode")
			: ($config.screenMode = "dark-mode");
		setTimeout(() => (onLoad = true), 50);
	});
</script>

<!-- full page div making the whole screen dark mode -->
<div class={`app ${$config.screenMode}`}>
	{#if onLoad}
		<div class="main-container" transition:fade={{ delay: 500, duration: 500 }}>
			<Logo />
			<Links>
				<Link
					text="Meetup"
					link="http://meetup.com/TriDev"
					icon="meetup.svg"
					aClasses="meetup"
				/>
				<Link
					text="On Discord"
					link="https://discord.gg/GX7WQZukYj"
					icon="discord.svg"
					aClasses="discord"
				/>
			</Links>
			<Sponsors data={sponsors} />
			<img
				class="switch"
				src="lightbulb.svg"
				alt={`Turn ${
					$config.screenMode === "dark-mode" ? "on" : "off"
				} the lights`}
				on:click={() =>
					$config.screenMode === "dark-mode"
						? ($config.screenMode = "light-mode")
						: ($config.screenMode = "dark-mode")}
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	// todo move to variables.scss
	$white: #fff;
	$black: #000;
	.app {
		// a full screen overlay with a black background
		position: fixed;
		@media (max-width: 600px) {
			position: absolute;
			padding-top: 4rem;
			padding-bottom: 4rem;
		}
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: $black;
		color: $white;
		transition: all 0.3s ease-in-out;
		.switch {
			filter: invert(1);
			width: 25px;
			cursor: pointer;
			transform: none;
			&:hover {
				transform: rotate(10deg);
			}
		}
	}
	.light-mode {
		background: $white;
		.switch {
			filter: invert(0);
		}
	}
	.main-container {
		display: flex;
		gap: 20px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 300px;
		margin: auto;
	}
</style>
