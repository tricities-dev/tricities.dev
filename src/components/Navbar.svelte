<script lang="ts">
	import { themeStore } from "../stores";
	import { Hamburger } from 'svelte-hamburgers';
	import Logo from "../components/logo.svelte";

	let theme:string = $themeStore;
	let open:boolean;

	let y:number;

	function getColor() {
		switch (theme) {
			case 'light':
				return 'black'
			case 'dark':
				return 'white'
			default:
				return 'white'
		}
	}
</script>

<div class="nav"
	class:glass={y > 0}
>
	<Logo width={175} height={55}/>
	<Hamburger bind:open --color={ getColor() }/>
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
	height: 6rem;
	padding-inline: 6rem;
	transition: ease-in-out .3s;
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
