<script lang="ts">
	import { themeStore, menuStore } from "../stores";
	import { Hamburger } from 'svelte-hamburgers';
	import Logo from "../components/logo.svelte";
	import Menu from "./Menu.svelte";

	let y:number;

	const hamburgerColor = (theme:string):string => {
		let color:string

		if (theme === 'exp' || theme === 'dark') {
			return color = 'white'
		}

		return color = 'black'
	}
</script>

<div class="nav"
	class:glass={y > 0 || $menuStore}
	class:shadow={y > 0 || $menuStore}
>
	<div class="navbar">
		<Logo width={ 175 } height={ 55 } dark={ $themeStore === 'dark' ? true : false }/>
		<Hamburger bind:open={ $menuStore } --color={ hamburgerColor($themeStore) }/>
	</div>
	<div class="menubar">
		<Menu />
	</div>
</div>

<svelte:window bind:scrollY={ y } />

<style>
	.nav {
		position: fixed;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: space-around;
		align-items: center;
		width: 100vw;
		min-height: var(--nav-height);
		top: 0;
		left: 0;
		z-index: 100;
		transition: ease-in-out .3s;
	}

	.navbar {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100%;
		padding-block: 2rem;
		padding-inline: 12rem;
	}

	.glass {
		/* From https://css.glass */
		background: var(--glass-bg);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(9.5px);
		transition: ease-in-out .3s;
	}

	.shadow {
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	}

	@media only screen and (max-width: 1366px) {
		.nav {
			padding-inline: 4rem;
		}

		.navbar {
			padding-inline: 0;
		}
	}

	@media only screen and (max-width: 430px) {
		.nav {
			padding-inline: 1.5rem;
		}
	}
</style>
