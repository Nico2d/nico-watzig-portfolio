import { useState } from 'react'
import { Header } from '@/components/header'
import { postIsPublished } from '@/lib/blog-helpers'
import getBlogIndex from '@/lib/notion/getBlogIndex'
import { ProjectsGrid } from '@/components/ui/ProjectsGrid'
import { Filter } from '@/components/ui/Filter'

export async function getStaticProps({ preview }) {
	const postsTable = await getBlogIndex()

	const posts: any[] = Object.keys(postsTable)
		.map((slug) => {
			const post = postsTable[slug]
			if (!preview && !postIsPublished(post)) {
				return null
			}

			return post
		})
		.filter(Boolean)

	return {
		props: {
			preview: preview || false,
			posts,
		},
		revalidate: 10,
	}
}

const Index = ({ posts = [] }) => {
	const [filteredPosts, setFilteredPosts] = useState(posts)

	const filterProjects = (filter) => {
		if (filter === 'all') {
			setFilteredPosts(posts)
		} else {
			setFilteredPosts(
				posts.filter((item) => {
					const technologies = item.Technology?.split(',') ?? []

					return technologies
						.map((item) => item.toLowerCase())
						.includes(filter.toLowerCase())
				})
			)
		}
	}

	return (
		<>
			<Header />

			<div className="container-md space-y-8 mt-48 mb-20">
				<Filter onClick={filterProjects} />

				{filteredPosts.length > 0 ? (
					<ProjectsGrid posts={filteredPosts} />
				) : (
					<p>There are no posts yet</p>
				)}
			</div>
		</>
	)
}

export default Index
