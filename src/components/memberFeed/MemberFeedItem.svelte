<script lang="ts">
	import CtaLink from "../ui/CtaLink.svelte";

	export let title: string;
	export let postLink: string;
	export let imageUrl: string | undefined = undefined;
	export let author: string | undefined = undefined;
	export let authorWebsite: string | undefined = undefined;
</script>

<div class="member-feed-item">
	{#if imageUrl}
		<div class="member-feed-item-image" style="background-image: url({imageUrl}); background-size: cover; background-position: center;"></div>
	{/if}
	<div class="member-feed-item-content" class:no-image={!imageUrl}>
		{#if author}
			<p class="feed-item-author">
				{#if authorWebsite}
					<a href={authorWebsite} target="_blank" rel="noopener">{author}</a>
				{:else}
					{author}
				{/if}
			</p>
		{/if}
		<h3 class="feed-item-title">{ title }</h3>
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
		padding: 2rem;
	}

	.member-feed-item-image {
		width: min(13rem, 100%);
		height: auto;
		aspect-ratio: 1/1;
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
		min-width: min(20rem, 100%);
	}

	.member-feed-item-content.no-image {
		min-width: 100%;
	}

	.feed-item-author {
		font-family: var(--body-font-family);
		font-size: 0.875rem;
		color: var(--secondary-text-color);
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.feed-item-author a {
		color: var(--cta-btn-bg);
		text-decoration: none;
	}

	.feed-item-author a:hover {
		text-decoration: underline;
	}

	.feed-item-title {
		width: 100%;
		font-family: var(--header-font-family);
		font-size: clamp(1.5rem, 3vw, 2rem);
		line-height: 1.2;
		color: var(--primary-text-color);
		word-wrap: break-word;
	}

	@media only screen and (max-width: 1366px) {
		.member-feed-item {
			justify-items: center;
			align-items: center;
			padding: 1.5rem;
		}
	}

	@media only screen and (max-width: 768px) {
		.member-feed-item {
			flex-direction: column;
			align-items: center;
			text-align: center;
			padding: 1rem;
		}

		.member-feed-item-content {
			align-items: center;
		}
	}

	@media only screen and (max-width: 430px) {
		.member-feed-item {
			padding: 0.5rem;
		}

		.member-feed-item-image {
			width: 100%;
			border-radius: 0;
		}

		.member-feed-item-content {
			width: 100%;
		}
	}
</style>
