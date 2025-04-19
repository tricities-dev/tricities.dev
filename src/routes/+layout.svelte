<script lang="ts">
	import { onMount } from "svelte";
	import '../styles/app.css';
	// import link from './link.svelte';
	import { themeStore } from '../stores';
	import Navbar from "../components/Navbar.svelte";
	import Footer from '../components/Footer.svelte';

	// Initialize theme from HTML attribute to prevent flash
	const initialTheme = typeof document !== 'undefined' 
		? document.documentElement.getAttribute('data-theme') || 'light'
		: 'light';
	
	themeStore.set(initialTheme);

	// Subscribe to theme changes and update HTML element
	$: if (typeof document !== 'undefined') {
		document.documentElement.setAttribute('data-theme', $themeStore);
	}

	onMount(() => {
		// Listen for system theme changes
		const mediaQuery = window.matchMedia("(prefers-color-scheme:dark)");
		const handleThemeChange = (e: MediaQueryListEvent) => {
			themeStore.set(e.matches ? 'dark' : 'light');
		};
		
		mediaQuery.addEventListener('change', handleThemeChange);
		return () => mediaQuery.removeEventListener('change', handleThemeChange);
	});
</script>

<!-- full page div making the whole screen dark mode -->
<div class="page-content content-grid">
	<Navbar />
	<slot></slot>
	<Footer />
</div>

<style>
	/* Add display: none while loading to prevent FOUC */
	:global(html:not(:defined)) {
		display: none;
	}

	.page-content {
		background-color: var(--primary-bg-color);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	@media only screen and (max-width: 1366px) {
		.page-content {
			padding: 0;
		}
	}

	@media only screen and (max-width: 768px) {
		.page-content {
			padding: 0;
		}
	}

	@media only screen and (max-width: 430px) {
		.page-content {
			padding: 0;
		}
	}
</style>
