import { textBlock } from '../lib/notion/renderers'
import Heading from '../components/heading'
import { getDateStr } from '../lib/blog-helpers'
import components from '../components/dynamic'
import React from 'react'
import { renderText } from '../lib/notion/renderers/renderText'
import { renderBookmark } from '../lib/notion/renderers/renderBookmark'
import { renderEmbed } from '../lib/notion/renderers/renderEmbed'
import { renderCode } from '../lib/notion/renderers/renderCode'
import { renderTweet } from '../lib/notion/renderers/renderTweet'
import { renderEquation } from '../lib/notion/renderers/renderEquation'
import { renderCallout } from '../lib/notion/renderers/renderCallout'
import { renderQuote } from '../lib/notion/renderers/renderQuote'

interface pageContent {
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
          <div className="posted">Posted: {getDateStr(post.Date)}</div>
        )}
        <hr />
      </>
    )
  }

  const isList = (block) => {
    return LIST_TYPES.has(block.value.type)
  }

  const renderList = (block, blockIdx) => {
    const { type, properties, id, parent_id } = block.value

    const isLast = blockIdx === post.content.length - 1
    const isList = LIST_TYPES.has(type)
    const listTagName = components[type === 'bulleted_list' ? 'ul' : 'ol']
    const listLastId = `list${id}`

    const listMap = {}

    listMap[id] = {
      key: id,
      nested: [],
      children: textBlock(properties?.title ?? '', true, id),
    }

    if (listMap[parent_id]) {
      listMap[id].isNested = true
      listMap[parent_id].nested.push(id)
    }

    if (listTagName && (isLast || !isList)) {
      return React.createElement(
        listTagName,
        { key: listLastId! },
        Object.keys(listMap).map((itemId) => {
          if (listMap[itemId].isNested) return null

          const createEl = (item) =>
            React.createElement(
              components.li || 'ul',
              { key: item.key },
              item.children,
              item.nested.length > 0
                ? React.createElement(
                    components.ul || 'ul',
                    { key: item + 'sub-list' },
                    item.nested.map((nestedId) => createEl(listMap[nestedId]))
                  )
                : null
            )
          return createEl(listMap[itemId])
        })
      )
    }

    return []
  }

  const renderHeading = (
    block,
    blockIdx,
    Type: string | React.ComponentType
  ) => {
    const { properties, id } = block.value

    console.log('heading', block.value)

    return (
      <Heading key={id}>
        <Type key={id}>{textBlock(properties.title, true, id)}</Type>
      </Heading>
    )
  }

  const switchRender = (block) => {
    const { value } = block
    const { type, properties, id } = value

    switch (type) {
      case 'page':
      case 'divider':
        break

      case 'text':
        return renderText(block)

      case 'image':
        if (!properties.title) {
          return <img key={block.value.id} src={properties.source[0]} />
        }
        break

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

      default:
        console.log('unknown type', type)
        break
    }
  }

  const renderContent = () => {
    if (!post.content || post.content.length === 0) {
      return <p>This post has no content</p>
    }

    let toRender = []
    post.content.map((block, blockIdx) => {
      if (isList(block)) {
        toRender.push(renderList(block, blockIdx))
      }

      toRender.push(switchRender(block))
    })

    return toRender
  }

  return {
    renderPostHeader,
    renderList,
    renderHeading,
    renderBookmark,
    isList,
    switchRender,
    renderContent,
  }
}
