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
import { NotionColumnList } from '../lib/notion/renderers/NotionColumnList'
import { NotionList2 } from '../lib/notion/renderers/NotionList2'

export interface pageContent {
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

			case 'bulleted_list':
				return <NotionList2 key={idx} block={block} postId={post.id} />

			case 'numbered_list':
				return <NotionList2 key={idx} block={block} postId={post.id} />

			case 'to_do':
				return <NotionCheckbox key={idx} block={block} />

			case 'column_list':
				return <NotionColumnList key={idx} block={block} />

			default:
				console.log('unknown type', block.value.type)
				break
		}
	}

	const renderContent = () => {
		if (!post.content || post.content.length === 0) {
			return <p>This post has no content</p>
		}

		const contentBlocks = extractContent(post.content, post.id)

		return contentBlocks.map((block: IBlock, idx) =>
			switchRender(block, idx)
		)
	}

	return {
		renderPostHeader,
		renderList: NotionList,
		isList,
		switchRender,
		renderContent,
	}
}

const extractContent = (blocksCollection: IBlock[], postId) => {
	const collectionObject = convertBlocksArrayToObject(blocksCollection)

	const extractContentByBlock = (block: IBlock, level = 1): IBlock => {
		if (block?.value?.content) {
			block.value.contentBlock = block.value.content.map((contentId) =>
				extractContentByBlock(collectionObject[contentId], level + 1)
			)
		}

		return block
	}

	return blocksCollection
		.filter((block) => block.value.parent_id === postId)
		.map((block) => extractContentByBlock(block))
}

const convertBlocksArrayToObject = (blocksCollection) => {
	return blocksCollection.reduce((accumulator, currentValue) => {
		accumulator[currentValue.value.id] = currentValue
		return accumulator
	}, {})
}
