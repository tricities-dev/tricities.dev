export type memberPost = {
	title: string,
	description: string,
	postLink: string,
	siteLink: string,
	pubDate: Date,
	imageUrl?: string,
	author?: string,
	authorWebsite?: string,
	authorTwitter?: string,
}

export type memberPosts = memberPost[]
