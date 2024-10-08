import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Header } from '@/components/header'
import { useNotionRender } from '@/hooks/useNotionRender'
import { getBlogLink } from '@/lib/blog-helpers'
import getBlogIndex from '@/lib/notion/getBlogIndex'
import getPageData from '@/lib/notion/getPageData'
import { INotionProject } from '@/types/notion.types'
import Head from 'next/head'

export async function getStaticProps({ params: { slug }, preview }) {
	const postsTable = await getBlogIndex()
	const post: INotionProject = Object.values(postsTable).find(
		(postItem: INotionProject) => postItem.Slug === slug
	) as INotionProject

	if (!post || (post.Published !== 'Yes' && !preview)) {
		console.log(`Failed to find post for slug: ${slug}`)
		return {
			props: {
				redirect: '/projects',
				preview: false,
			},
			revalidate: 5,
		}
	}
	const postData = await getPageData(post.id)
	post.content = postData.blocks

	return {
		props: {
			post,
			preview: preview || false,
		},
		revalidate: 10,
	}
}

export async function getStaticPaths() {
	const postsTable = await getBlogIndex()

	return {
		paths: Object.keys(postsTable)
			.filter((post) => postsTable[post].Published === 'Yes')
			.map((slug) => getBlogLink(slug)),
		fallback: true,
	}
}

const RenderPost = ({ post, redirect, preview }) => {
	const router = useRouter()

	const { renderPostHeader, renderContent } = useNotionRender(post)

	useEffect(() => {
		const twitterSrc = 'https://platform.twitter.com/widgets.js'
		if (post && post.hasTweet) {
			if ((window as any)?.twttr?.widgets) {
				;(window as any).twttr.widgets.load()
			} else if (!document.querySelector(`script[src="${twitterSrc}"]`)) {
				const script = document.createElement('script')
				script.async = true
				script.src = twitterSrc

				document.querySelector('body')?.appendChild(script)
			}
		}
	}, [])

	useEffect(() => {
		if (redirect && !post) {
			router.replace(redirect)
		}
	}, [redirect, post])

	if (router.isFallback) {
		return <div>Loading...</div>
	}

	if (!post) {
		return (
			<div>
				<p>
					Woops! didn't find that post, redirecting you back to the
					blog index
				</p>
			</div>
		)
	}

	return (
		<>
			<Head>
				<title>{post.Name} | Nico Wätzig</title>
				<meta name="description" content={post.Summary} key="desc" />
				<meta
					property="og:title"
					content={`${post.Name} | Nico Wätzig`}
				/>
				<meta property="og:description" content={post.Summary} />
				<meta property="og:image" content={post.Thumbnail} />
			</Head>

			<Header />

			<div className="space-y-3 container-md mt-48 mb-20">
				{renderPostHeader()}
				{renderContent()}
			</div>
		</>
	)
}

export default RenderPost
