<script lang="ts">
	import { onMount } from "svelte";
	import '../styles/app.css';
	// import link from './link.svelte';
	import { themeStore } from '../stores.js';
	import Navbar from "../components/Navbar.svelte";
	import Footer from '../components/Footer.svelte';

	onMount(() => {
		const prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)")
			.matches;

		$themeStore = prefersDarkMode ? 'dark' : 'light';
	})

</script>

<!-- full page div making the whole screen dark mode -->
<div class="page-content" data-theme={$themeStore}>
	<Navbar />
	<slot></slot>
	<Footer />
</div>

<style>
.page-content {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 0 12rem 0 12rem;
	background-color: var(--primary-bg-color);
}

@media only screen and (max-width: 1366px) {
  .page-content {
	padding: 0 4rem;
	}
}

@media only screen and (max-width: 430px) {
  .page-content {
	padding: 0;
	}
}
</style>
