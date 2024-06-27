import { getDateStr } from '../lib/blog-helpers'
import React from 'react'
import { renderText } from '../lib/notion/renderers/renderText'
import { renderBookmark } from '../lib/notion/renderers/renderBookmark'
import { renderEmbed } from '../lib/notion/renderers/renderEmbed'
import { renderCode } from '../lib/notion/renderers/renderCode'
import { renderTweet } from '../lib/notion/renderers/renderTweet'
import { renderEquation } from '../lib/notion/renderers/renderEquation'
import { renderCallout } from '../lib/notion/renderers/renderCallout'
import { renderQuote } from '../lib/notion/renderers/renderQuote'
import { renderList } from '../lib/notion/renderers/renderBulletList'
import { renderCheckbox } from '../lib/notion/renderers/renderCheckbox'
import { renderImage } from '../lib/notion/renderers/renderImage'

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
				{post.Authors.length > 0 && (
					<div className="authors">By: {post.Authors.join(' ')}</div>
				)}
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

	const switchRender = (block) => {
		switch (block.value.type) {
			case 'page':
			case 'divider':
				break

			case 'text':
				return renderText(block)

			case 'image':
				return renderImage(block)

			case 'video':
				break

			case 'embed':
				return renderEmbed(block)

			case 'header':
				return renderText(block, 'h2')

			case 'sub_header':
				return renderText(block, 'h3')

			case 'sub_sub_header':
				return renderText(block, 'h4')

			case 'bookmark':
				return renderBookmark(block)

			case 'code':
				return renderCode(block)

			case 'quote':
				return renderQuote(block)

			case 'callout':
				return renderCallout(block)

			case 'tweet':
				return renderTweet(block)

			case 'equation':
				return renderEquation(block)

			case 'listCollection':
				return renderList(block, post.id)

			case 'to_do':
				return renderCheckbox(block)

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
		post.content.map((block) => {
			if (isList(block)) {
				listCollection.push(block)
			} else {
				if (listCollection.length > 0) {
					const blockCollectionObject = {
						value: {
							type: 'listCollection',
							listCollection: listCollection,
						},
					}

					toRender.push(switchRender(blockCollectionObject))
					listCollection = []
				}

				if (listCollection.length === 0) {
					toRender.push(switchRender(block))
				}
			}
		})

		return toRender
	}

	return {
		renderPostHeader,
		renderList,
		renderBookmark,
		isList,
		switchRender,
		renderContent,
	}
}
