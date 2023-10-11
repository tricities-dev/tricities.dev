<script lang="ts">
	export let width:number;
	export let height:number;

	const logoImg:string = "tridev-logo.svg";
</script>

<img class="logo" src={logoImg} width={width} height={height} alt="TriDev Logo" />

<style lang="scss">
.logo {
	max-width: 300px;
	display: flex;
	justify-content: center;
	filter: none;
	transition: all 0.3s ease-in-out;
	filter: var(--filter-invert);
}

</style>
