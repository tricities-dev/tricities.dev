<script lang="ts">
	import { config } from '../stores.js';

	export let width:number;
	export let height:number;

	const logoImg:string = "tridev-logo.svg";
	console.log('logo $config.screenMode', $config.screenMode);
</script>

<img class={`logo ${ $config.screenMode }`} src={logoImg} width={width} height={height} alt="TriDev Logo" />

<style lang="scss">
.logo {
	max-width: 300px;
	display: flex;
	justify-content: center;
	filter: none;
	transition: all 0.3s ease-in-out;

	&.dark-mode {
		filter: invert(1);
	}
}

</style>
