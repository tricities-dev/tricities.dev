<script lang="ts">
	import { Hamburger } from 'svelte-hamburgers';
	import Logo from "../components/logo.svelte";

	let open:boolean;

	let y:number;
</script>

<div class="nav"
	class:glass={y > 0}
>
	<Logo width={175} height={55}/>
	<Hamburger bind:open/>
</div>

<svelte:window bind:scrollY={y} />

<style lang="scss">
.nav {
	position: fixed;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 8rem;
	padding: 1rem 6rem;
}

.glass {
	/* From https://css.glass */
	background: $whiteGlass;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(9.5px);
	-webkit-backdrop-filter: blur(9.5px);
}
</style>
