<script lang="ts">
	import { themeStore } from "../stores";
	import { Hamburger } from 'svelte-hamburgers';
	import Logo from "../components/logo.svelte";

	let open:boolean;

	let y:number;
</script>

<div class="header"
	class:glass={y > 0}
>
	<div class="nav">
		<Logo width={175} height={55} dark={ $themeStore === 'dark' ? true : false }/>
		<Hamburger bind:open --color={ $themeStore === 'light' || $themeStore === 'exp' ? 'black' : 'white' }/>
	</div>
</div>

<svelte:window bind:scrollY={y} />

<style>
.header {
	position: fixed;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 6rem;
	transition: ease-in-out .3s;
	z-index: 100;
}

.nav {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	width: calc(100% - 12rem);
	height: 100%;
}

.glass {
	/* From https://css.glass */
	background: var(--glass-bg);
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(9.5px);
	-webkit-backdrop-filter: blur(9.5px);
	transition: ease-in-out .3s;
}
</style>
