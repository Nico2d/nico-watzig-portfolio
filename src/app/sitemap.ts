import { getProjects } from '@/lib/notion/getProjects'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const BASE_URL = process.env.BASE_URL ?? ""
	const postsTable = await getProjects()
	const projectsSitemap = postsTable
		.filter((project) => project.Slug)
		.map((project) => {
			return {
				url: `${BASE_URL}/projects/${project.Slug}`,
				lastModified: new Date(project.lastModified),
			}
		})

	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
		},
		{
			url: `${BASE_URL}/contact`,
			lastModified: new Date(),
		},
		{
			url: `${BASE_URL}/projects`,
			lastModified: new Date(),
		},

		...projectsSitemap,
	]
}
