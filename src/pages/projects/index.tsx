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
	const [currentFilter, setCurrentFilter] = useState('all')
	const [filteredPosts, setFilteredPosts] = useState(posts)

	console.log('posts: ', posts)
	console.log('filteredPosts: ', filteredPosts)

	return (
		<>
			<Header titlePre="Projects" />

			<Filter
				onClick={(filter) => {
					console.log(filter)

					setCurrentFilter(filter)
				}}
			/>

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
