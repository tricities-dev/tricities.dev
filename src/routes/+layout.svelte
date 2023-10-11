<script lang="ts">
	import '../styles/app.css';
	// import link from './link.svelte';
	import { themeStore } from '../stores.js';
	import Navbar from "../components/Navbar.svelte";

	let theme:string = $themeStore;
</script>

<!-- full page div making the whole screen dark mode -->
<div class="page-content" data-theme={theme}>
	<Navbar />
	<slot></slot>
</div>

<style>
.page-content {
	position: relative;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: var(--primary-bg-color);
}
</style>
