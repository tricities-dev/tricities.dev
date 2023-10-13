<script lang="ts">
	import { themeStore, menuStore } from "../stores";
	import { Hamburger } from 'svelte-hamburgers';
	import Menu from "./Menu.svelte";
	import Logo from "../components/logo.svelte";

	let open:boolean = $menuStore;
	let y:number;
</script>

<div class="nav"
	class:glass={y > 0 || $menuStore}
>
	<Logo width={175} height={55} dark={ $themeStore === 'dark' ? true : false }/>
	<Hamburger bind:open={$menuStore} --color={ $themeStore === 'light' || $themeStore === 'exp' ? 'black' : 'white' }/>
</div>

<svelte:window bind:scrollY={y} />

<style>
.nav {
	position: fixed;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: var(--nav-height);
	top: 0;
	padding-inline: 12rem;
	z-index: 100;
}

.glass {
	/* From https://css.glass */
	background: var(--glass-bg);
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(9.5px);
	-webkit-backdrop-filter: blur(9.5px);
	transition: ease-in-out .3s;
}
@media only screen and (max-width: 1366px) {
  .nav {
	padding-inline: 4rem;
	}
}

@media only screen and (max-width: 430px) {
  .nav {
		padding-inline: 1.5rem;
	}
}
</style>
