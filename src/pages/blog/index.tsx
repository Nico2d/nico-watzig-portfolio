import Header from '../../components/header'
import blogStyles from '../../styles/blog.module.css'
import { postIsPublished } from '../../lib/blog-helpers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import { ProjectItem } from '../../components/ProjectItem'
import { getNotionPrivImage } from '../../lib/notion/utils'

export async function getStaticProps({ preview }) {
	const postsTable = await getBlogIndex()

	const authorsToGet: Set<string> = new Set()
	const posts: any[] = Object.keys(postsTable)
		.map((slug) => {
			const post = postsTable[slug]
			if (!preview && !postIsPublished(post)) {
				return null
			}
			post.Authors = post.Authors || []
			for (const author of post.Authors) {
				authorsToGet.add(author)
			}
			return post
		})
		.filter(Boolean)

	const { users } = await getNotionUsers([...authorsToGet])

	posts.map((post) => {
		post.Authors = post.Authors.map((id) => users[id].full_name)
	})

	return {
		props: {
			preview: preview || false,
			posts,
		},
		revalidate: 10,
	}
}

const Index = ({ posts = [] }) => {
	return (
		<>
			<Header titlePre="Projects" />

			{posts.length === 0 ? (
				<p className={blogStyles.noPosts}>There are no posts yet</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
					{posts.map((post) => {
						const stack = post.Technology?.split(',')

						return (
							<ProjectItem
								key={post.Slug}
								title={post.Name}
								description={post.preview}
								stack={stack}
								repoUrl={post.Repo}
								liveUrl={post.Demo}
								thumbnail={getNotionPrivImage(
									post.Thumbnail,
									post.id
								)}
								slug={post.Slug}
							/>
						)
					})}
				</div>
			)}
		</>
	)
}

export default Index
