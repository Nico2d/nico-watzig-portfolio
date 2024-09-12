import { postIsPublished } from '../blog-helpers'
import getBlogIndex from './getBlogIndex'

export const getProjects = async (): Promise<any[]> => {
	const postsTable = await getBlogIndex()

	const posts: any[] = Object.keys(postsTable)
		.map((slug) => {
			const post = postsTable[slug]
			if (!postIsPublished(post)) {
				return null
			}

			return post
		})
		.filter(Boolean)

	return posts
}
