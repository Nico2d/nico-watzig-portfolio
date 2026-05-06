import { getDateStr } from '@/lib/blog-helpers'
import { NotionBookmark } from '@/lib/notion/renderers/NotionBookmark'
import { NotionCallout } from '@/lib/notion/renderers/NotionCallout'
import { NotionCheckbox } from '@/lib/notion/renderers/NotionCheckbox'
import { NotionCode } from '@/lib/notion/renderers/NotionCode'
import { NotionColumnList } from '@/lib/notion/renderers/NotionColumnList'
import { NotionDivider } from '@/lib/notion/renderers/NotionDivider'
import { NotionEmbed } from '@/lib/notion/renderers/NotionEmbed'
import { NotionEquation } from '@/lib/notion/renderers/NotionEquation'
import { NotionImage } from '@/lib/notion/renderers/NotionImage'
import { NotionList } from '@/lib/notion/renderers/NotionList'
import { NotionList2 } from '@/lib/notion/renderers/NotionList2'
import { NotionQuote } from '@/lib/notion/renderers/NotionQuote'
import { NotionText } from '@/lib/notion/renderers/NotionText'
import { NotionTweet } from '@/lib/notion/renderers/NotionTweet'
import { IBlock } from '@/types/notion.types'

export interface pageContent {
	id: string
	Page: string
	Date: string
	Published: string
	Slug: string
	Name: string
	content: []
	Authors: []
}

export const useNotionRender = (post: pageContent) => {
	const LIST_TYPES = new Set(['bulleted_list', 'numbered_list'])

	const NotionHeaders = () => {
		return (
			<>
				<h1 className="text-5xl font-extrabold mb-6 font-sans">
					{post.Name || ''}
				</h1>
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

	const switchRender = (block: IBlock): JSX.Element | null => {
		const keyValue = block.value.id

		switch (block.value.type) {
			case 'page':
				return null
			case 'divider':
				return <NotionDivider key={keyValue} />

			case 'text':
				return <NotionText key={keyValue} block={block} />

			case 'image':
				return <NotionImage key={keyValue} block={block} />

			case 'video':
				break

			case 'embed':
				return <NotionEmbed key={keyValue} block={block} />

			case 'header':
				return <NotionText key={keyValue} block={block} tag="h2" />

			case 'sub_header':
				return <NotionText key={keyValue} block={block} tag="h3" />

			case 'sub_sub_header':
				return <NotionText key={keyValue} block={block} tag="h4" />

			case 'bookmark':
				return <NotionBookmark key={keyValue} block={block} />

			case 'code':
				return <NotionCode key={keyValue} block={block} />

			case 'quote':
				return <NotionQuote key={keyValue} block={block} />

			case 'callout':
				return <NotionCallout key={keyValue} block={block} />

			case 'tweet':
				return <NotionTweet key={keyValue} block={block} />

			case 'equation':
				return <NotionEquation key={keyValue} block={block} />

			case 'bulleted_list':
				return (
					<NotionList2
						key={keyValue}
						block={block}
						postId={post.id}
					/>
				)

			case 'numbered_list':
				return (
					<NotionList2
						key={keyValue}
						block={block}
						postId={post.id}
					/>
				)

			case 'to_do':
				return <NotionCheckbox key={keyValue} block={block} />

			case 'column_list':
				return <NotionColumnList key={keyValue} block={block} />

			default:
				console.log('unknown type', block.value.type)
				return null
		}

		return null
	}

	const NotionContent = () => {
		if (!post.content || post.content.length === 0) {
			return <p>This post has no content</p>
		}

		const contentBlocks = extractContent(post.content, post.id)

		return (
			<div>
				{contentBlocks.map((block: IBlock) => switchRender(block))}
			</div>
		)
	}

	return {
		NotionHeaders,
		NotionContent,
		renderList: NotionList,
		isList,
		switchRender,
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
		.filter((block) => block?.value?.parent_id === postId)
		.map((block) => extractContentByBlock(block))
}

const convertBlocksArrayToObject = (blocksCollection) => {
	return blocksCollection.reduce((accumulator, currentValue) => {
		const blockId = currentValue?.value?.id

		if (blockId) {
			accumulator[blockId] = currentValue
		}

		return accumulator
	}, {})
}
