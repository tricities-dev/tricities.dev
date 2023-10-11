<script>
	// iport link from './link.svelte';
	import { config } from "../stores.js";
	import Navbar from "../components/Navbar.svelte";
</script>

<!-- full page div making the whole screen dark mode -->
<div class="content">
	<Navbar />
	<main>
	</main>
	<aside>
	</aside>
</div>

<style lang="scss">
.content {
	position: relative;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
}
</style>
