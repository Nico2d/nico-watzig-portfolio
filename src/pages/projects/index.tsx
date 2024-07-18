import { useEffect, useState } from 'react'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import { postIsPublished } from '../../lib/blog-helpers'
import { ProjectItem } from '../../components/ProjectItem'
import { getNotionPrivImage } from '../../lib/notion/utils'
import { Header } from '../../components/header'
import { Filter } from '../../components/Filter'

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
	const [columnsNum, setColumnsNum] = useState(4)

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

	function splitListIntoColumns(list, numColumns) {
		const columns = []
		for (let i = 0; i < numColumns; i++) {
			columns.push([])
		}

		for (let i = 0; i < list.length; i++) {
			const columnIndex = i % numColumns
			columns[columnIndex].push(list[i])
		}

		return columns
	}

	const columns = splitListIntoColumns(filteredPosts, columnsNum)

	useEffect(() => {
		const updateColumnsNum = () => {
			const width = window.innerWidth
			if (width < 768) {
				setColumnsNum(1)
			} else if (width < 1280) {
				setColumnsNum(2)
			} else if (width < 1920) {
				setColumnsNum(3)
			} else {
				setColumnsNum(4)
			}
		}

		updateColumnsNum()
		window.addEventListener('resize', updateColumnsNum)

		return () => window.removeEventListener('resize', updateColumnsNum)
	}, [])

	return (
		<>
			<Header titlePre="Projects" />

			<Filter onClick={filterProjects} />

			{filteredPosts.length === 0 ? (
				<p>There are no posts yet</p>
			) : (
				<div className="flex flex-row gap-5">
					{columns.map((column) => (
						<div className="flex flex-col gap-5">
							{column.map((post) => (
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
					))}
				</div>
			)}
		</>
	)
}

export default Index
