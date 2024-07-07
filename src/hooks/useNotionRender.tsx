import { getDateStr } from '../lib/blog-helpers'
import React from 'react'
import { NotionText } from '../lib/notion/renderers/NotionText'
import { NotionBookmark } from '../lib/notion/renderers/NotionBookmark'
import { NotionEmbed } from '../lib/notion/renderers/NotionEmbed'
import { NotionCode } from '../lib/notion/renderers/NotionCode'
import { NotionTweet } from '../lib/notion/renderers/NotionTweet'
import { NotionEquation } from '../lib/notion/renderers/NotionEquation'
import { NotionCallout } from '../lib/notion/renderers/NotionCallout'
import { NotionQuote } from '../lib/notion/renderers/NotionQuote'
import { NotionList } from '../lib/notion/renderers/NotionList'
import { NotionCheckbox } from '../lib/notion/renderers/NotionCheckbox'
import { NotionImage } from '../lib/notion/renderers/NotionImage'
import { IBlock } from '../types/notion.types'
import { NotionDivider } from '../lib/notion/renderers/NotionDivider'

interface pageContent {
	id: string
	Page: string
	Date: string
	Published: string
	Slug: string
	content: []
	Authors: []
}

export const useNotionRender = (post: pageContent) => {
	const LIST_TYPES = new Set(['bulleted_list', 'numbered_list'])

	const renderPostHeader = () => {
		return (
			<>
				<h1>{post.Page || ''}</h1>
				{post.Date && (
					<div className="posted">
						Posted: {getDateStr(post.Date)}
					</div>
				)}
				<hr />
			</>
		)
	}

	const isList = (block) => {
		return LIST_TYPES.has(block.value.type)
	}

	const switchRender = (block: IBlock, idx: number) => {
		switch (block.value.type) {
			case 'page':
			case 'divider':
				return <NotionDivider key={idx} />

			case 'text':
				return <NotionText key={idx} block={block} />

			case 'image':
				return <NotionImage key={idx} block={block} />

			case 'video':
				break

			case 'embed':
				return <NotionEmbed key={idx} block={block} />

			case 'header':
				return <NotionText key={idx} block={block} tag="h2" />

			case 'sub_header':
				return <NotionText key={idx} block={block} tag="h3" />

			case 'sub_sub_header':
				return <NotionText key={idx} block={block} tag="h4" />

			case 'bookmark':
				return <NotionBookmark key={idx} block={block} />

			case 'code':
				return <NotionCode key={idx} block={block} />

			case 'quote':
				return <NotionQuote key={idx} block={block} />

			case 'callout':
				return <NotionCallout key={idx} block={block} />

			case 'tweet':
				return <NotionTweet key={idx} block={block} />

			case 'equation':
				return <NotionEquation key={idx} block={block} />

			case 'listCollection':
				return <NotionList key={idx} block={block} postId={post.id} />

			case 'to_do':
				return <NotionCheckbox key={idx} block={block} />

			default:
				console.log('unknown type', block.value.type)
				break
		}
	}

	const renderContent = () => {
		if (!post.content || post.content.length === 0) {
			return <p>This post has no content</p>
		}

		let toRender = []
		let listCollection = []

		console.log(post.content.map((item) => item.value))

		post.content.map((block, idx) => {
			if (isList(block)) {
				listCollection.push(block)
			} else {
				if (listCollection.length > 0) {
					const blockCollectionObject: IBlock = {
						value: {
							type: 'listCollection',
							listCollection: listCollection,
						},
					} as IBlock

					toRender.push(switchRender(blockCollectionObject, idx - 1))
					listCollection = []
				}

				if (listCollection.length === 0) {
					toRender.push(switchRender(block, idx))
				}
			}
		})

		return toRender
	}

	return {
		renderPostHeader,
		renderList: NotionList,
		isList,
		switchRender,
		renderContent,
	}
}
