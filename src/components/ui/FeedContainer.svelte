<script lang="ts">
	export let title: string;
	export let zIndex: number = 0;
</script>

<div class="feed-container" style="z-index: {zIndex};">
	<div class="feed-header">
		<h2 class="feed-title">{ title }</h2>
	</div>
	<div class="feed-content">
		<slot></slot>
	</div>
</div>

<style>
.feed-container {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
	height: auto;
	background: var(--gradient-bg-vert);
	border: 2px solid var(--border-color);
	border-radius: 10px 0 0 0;
}

.feed-container::after {
  content: "";
  position: absolute;
	right: -40px;
	top: -40px;
  width: 70px;
  height: 70px;
  transform: rotate(45deg);
  background-color: var(--primary-bg-color);
	border: 4px solid var(--primary-bg-color);
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
</style>
