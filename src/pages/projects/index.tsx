import Header from '../../components/header'
import blogStyles from '../../styles/blog.module.css'
import { postIsPublished } from '../../lib/blog-helpers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import { ProjectItem } from '../../components/ProjectItem'
import { getNotionPrivImage } from '../../lib/notion/utils'
import { Filter } from '../../components/Filter'
import { useState } from 'react'

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
			<Header titlePre="Projects" />

			<Filter onClick={filterProjects} />

			{filteredPosts.length === 0 ? (
				<p className={blogStyles.noPosts}>There are no posts yet</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
					{filteredPosts.map((post) => (
						<ProjectItem
							key={post.Slug}
							title={post.Name}
							description={post.Summary}
							stack={post.Technology?.split(',')}
							thumbnail={getNotionPrivImage(
								post.Thumbnail,
								post.id,
								500
							)}
							slug={post.Slug}
						/>
					))}
				</div>
			)}
		</>
	)
}

export default Index
