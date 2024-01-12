<script lang="ts">
	import CtaLink from "../ui/CtaLink.svelte";

	export let title:string;
	export let description:string;
	export let postLink:string;
	export let siteLink:string; //TODO: This is for a general site link for the authors site if needed
</script>

<div class="member-feed-item">
	<div class="member-feed-item-image"></div>
	<div class="member-feed-item-content">
		<h3 class="feed-item-title">{ title }</h3>
		<p class="feed-item-description">{ description }</p>
		<CtaLink title="Read More..." link={postLink} />
	</div>
</div>

<style>
	.member-feed-item {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		gap: 2rem;
		width: 100%;
		padding: 0 6rem 0 6rem;
	}

	.member-feed-item-image {
		width: 13rem;
		height: 13rem;
		background-color: var(--gray);
		border-radius: 10px;
		z-index: 1;
	}

	.member-feed-item-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
		gap: .75rem;
	}

	.feed-item-title {
		width: 100%;
		font-family: var(--header-font-family);
		font-size: 2rem;
		line-height: 1.2;
		color: var(--primary-text-color);
	}

	.feed-item-description {
		font-family: var(--body-font-family);
		color: var(--primary-text-color);
		font-size: 1.25rem;
		line-height: 1.6;
	}

	@media only screen and (max-width: 1366px) {
		.member-feed-item {
			justify-items: center;
			align-items: center;
			padding: 0 1rem 0 1rem;
		}
	}

	@media only screen and (max-width: 430px) {
		.member-feed-item {
			justify-items: center;
			align-items: center;
			padding: 0 1rem 0 1rem;
		}

		.member-feed-item-image {
			width: 100%;
			height: auto;
			aspect-ratio: 1/1;
			border-radius: 0;
		}

		.member-feed-item-content {
			width: 100%;
		}

		.feed-item-title {
			word-wrap: break-word;
		}
	}
</style>
