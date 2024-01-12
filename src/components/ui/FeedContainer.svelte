<script lang="ts">
	export let title: string;
	export let id: string;
	export let zIndex: number = 0;
	export let className: string;
</script>

<div class={ className } id={ id } style="z-index: {zIndex};">
	<div class="feed-header">
		<h2 class="feed-title">{ title }</h2>
	</div>
	<div class="feed-content">
		<slot></slot>
	</div>
</div>

<style>
.feed-container {
	--top-end: calc(100% - 4rem);

	position: relative;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
	height: auto;
	background: var(--gradient-bg-vert);
	border: 2px solid var(--border-color);
	border-radius: 10px 0 0 0;
	clip-path: polygon(0% 0%, var(--top-end) 0%, 100% 4rem, 100% 100%, 0% 100%);
}

.member-feed {
	clip-path: polygon(0% 0%, var(--top-end) 0%, 100% 4rem, 100% 100%, 0% 100%);
}

.feed-header {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 6rem;
	background: var(--header-gradient);
	border-radius: 10px 0 0 0;
}

.feed-title {
	font-family: var(--header-font-family);
	font-size: 2rem;
	color: var(--header-text-color);
	padding-left: 3rem;
}

.feed-content {
	width: 100%;
}
@media only screen and (max-width: 430px) {
	.feed-header {
		border-radius: 0;
	}
}
</style>
