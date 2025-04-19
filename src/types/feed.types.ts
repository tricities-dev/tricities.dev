export type memberPost = {
	title: string,
	description: string,
	postLink: string,
	siteLink: string,
	pubDate: Date,
	imageUrl?: string,
}

export type memberPosts = memberPost[]
