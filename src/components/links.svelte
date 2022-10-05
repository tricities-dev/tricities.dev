<script lang="ts">
	export let href = '';

	let tag = href ? 'a' : 'button';
</script>

<ul>
	<slot />
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		max-width: calc(300px + 2rem);
		list-style: none;
		gap: 1rem;
		padding: 0;
	}
</style>
