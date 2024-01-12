<script lang="ts">
	import Icon from '@iconify/svelte';

	export let title: string;
	export let link: string;
	export let icon: any = null;

	let iconName:string;

	switch (icon) {
		case 'meetup':
			iconName = 'simple-icons:meetup';
			break;
		case 'discord':
			iconName = 'simple-icons:discord';
			break;
		default:
			iconName = '';
			break;
	}
</script>

<a href={ link } class="cta-button" target="_blank">
	{#if icon}
		<Icon icon={ iconName } width={ 24 } height={ 24 }/>
	{/if}
	{ title }
</a>

<style>
.cta-button {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: .5rem;
	padding: 12px 24px;
	background-color: var(--cta-btn-bg);
	color: var(--cta-btn-fg);
	font-family: var(--body-font-family);
	font-weight: bold;
	text-decoration: none;
	border-radius: 10px;
	transition: background-color 0.3s ease;
	filter: var(--btn-shadow);
}

.cta-button:hover {
	background-color: var(--cta-btn-hover-bg);
}
</style>
