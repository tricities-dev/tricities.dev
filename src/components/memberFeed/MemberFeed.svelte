<script lang="ts">
	import type { memberPosts } from '../../types/feed.types';
	import MemberFeedItem from "./MemberFeedItem.svelte";
	import {onMount} from "svelte";
	import {themeStore} from "../../stores";


	onMount(() => {
		fetch("https://ryanhayes.net/feed")
			.then(response => response.text())
			.then(str => {
				let parsed = new window.DOMParser().parseFromString(str, "text/xml")
				console.log(parsed)
				return parsed
			})
			.then(data => console.log(data))
	})

	// TODO: Build a member RSS feed


	let memberFeed:memberPosts = [
		{
			title: 'Azure Dev: Problem starting the plugin CredentialProvider.Microsoft [Solved]',
			description: 'In this break/fix post, I’m going to show you how to fix a specific error that I was getting in an Azure DevOps pipeline during a dotnet publish command that stated “Problem starting the plugin \‘CredentialProvider.Microsoft\'”.',
			postLink: 'https://ryanhayes.net/azure-devproblem-starting-the-plugin-credentialprovider-microsoft-solved/',
			siteLink: 'https://ryanhayes.net/',
		},
		{
			title: 'Azure Dev: Problem starting the plugin CredentialProvider.Microsoft [Solved]',
			description: 'In this break/fix post, I’m going to show you how to fix a specific error that I was getting in an Azure DevOps pipeline during a dotnet publish command that stated “Problem starting the plugin \‘CredentialProvider.Microsoft\'”.',
			postLink: 'https://ryanhayes.net/azure-devproblem-starting-the-plugin-credentialprovider-microsoft-solved/',
			siteLink: 'https://ryanhayes.net/',
		},
		{
			title: 'Azure Dev: Problem starting the plugin CredentialProvider.Microsoft [Solved]',
			description: 'In this break/fix post, I’m going to show you how to fix a specific error that I was getting in an Azure DevOps pipeline during a dotnet publish command that stated “Problem starting the plugin \‘CredentialProvider.Microsoft\'”.',
			postLink: 'https://ryanhayes.net/azure-devproblem-starting-the-plugin-credentialprovider-microsoft-solved/',
			siteLink: 'https://ryanhayes.net/',
		},
	]
</script>

<div class="member-feed">
	{#each memberFeed as post, i}
		<MemberFeedItem title={ post.title } description={ post.description } postLink={ post.postLink } siteLink={ post.siteLink } />
	{/each}
</div>

<style>
	.member-feed {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		gap: 3rem;
		width: 100%;
		height: auto;
		padding: 2rem 0;
	}

	@media only screen and (max-width: 430px) {
		.member-feed {
			padding: 0;
		}
	}
</style>
