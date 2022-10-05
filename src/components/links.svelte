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
		list-style: none;
		gap: 1rem;
		padding: 0;
		margin: 0;
	}
</style>
