<script>
	import Hero from "../components/ui/Hero.svelte";
</script>

<!-- full page div making the whole screen dark mode -->
<main>
	<Hero />
	<div class="content">
		<section>
			<h1>Hello</h1>
		</section>
		<aside>
			<h2>World</h2>
		</aside>
	</div>
</main>

<style>
main {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 1.5rem;
	width: 100%;
	height: 100%;
	padding-inline: 6rem;
}

.content {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 1.5rem;
	width: 100%;
}

section {
	flex: 1;
}

aside {
	min-width: 20rem;
	max-width: 40rem;
}
</style>
