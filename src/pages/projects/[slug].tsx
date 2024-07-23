import { useRouter } from 'next/router'
import { Header } from '../../components/header'
import getPageData from '../../lib/notion/getPageData'
import React, { useEffect } from 'react'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import { getBlogLink } from '../../lib/blog-helpers'
import { useNotionRender } from '../../hooks/useNotionRender'
import { INotionProject } from '../../types/notion.types'

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
				document.querySelector('body').appendChild(script)
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
			<Header titlePre={post.Page} />

			<div className="space-y-3">
				{renderPostHeader()}
				{renderContent()}
			</div>
		</>
	)
}

export default RenderPost
