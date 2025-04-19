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
	class:expanded={$menuStore}
>
	<div class="navbar-container">
		<div class="navbar">
			<Logo width={ 175 } height={ 55 } dark={ $themeStore === 'dark' ? true : false }/>
			<Hamburger bind:open={ $menuStore } --color={ hamburgerColor($themeStore) }/>
		</div>
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
		align-items: center;
		width: 100%;
		height: var(--nav-height);
		top: 0;
		left: 0;
		right: 0;
		padding: 0;
		z-index: 100;
		transition: ease-in-out .3s;
	}
	
	.nav.expanded {
		height: auto;
		min-height: var(--nav-height);
	}

	.navbar-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: var(--nav-height);
		flex-shrink: 0;
	}

	.navbar {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: 1440px;
		margin: 0 auto;
		height: 100%;
		padding: 0 2rem;
	}

	.menubar {
		width: 100%;
		max-width: 1440px;
		max-height: calc(100vh - var(--nav-height));
		overflow-y: auto;
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
		.navbar {
			padding: 0 1rem;
		}
	}

	@media only screen and (max-width: 768px) {
		.navbar {
			padding: 0 0.75rem;
		}
	}

	@media only screen and (max-width: 430px) {
		.navbar {
			padding: 0 0.5rem;
		}
	}
</style>
