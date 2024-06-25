import { CSSProperties } from 'react'
import { textBlock } from '../lib/notion/renderers'
import Heading from '../components/heading'
import ReactJSXParser from '@zeit/react-jsx-parser'
import { getDateStr } from '../lib/blog-helpers'
import components from '../components/dynamic'
import React from 'react'
import Link from 'next/link'
import blogStyles from '../styles/blog.module.css'

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

    return (
      <Heading key={id}>
        <Type key={id}>{textBlock(properties.title, true, id)}</Type>
      </Heading>
    )
  }

  const renderBookmark = ({ link, title, description, format }) => {
    const { bookmark_icon: icon, bookmark_cover: cover } = format

    return (
      <div className={blogStyles.bookmark}>
        <div>
          <div style={{ display: 'flex' }}>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className={blogStyles.bookmarkContentsWrapper}
              href={link}
            >
              <div role="button" className={blogStyles.bookmarkContents}>
                <div className={blogStyles.bookmarkInfo}>
                  <div className={blogStyles.bookmarkTitle}>{title}</div>
                  <div className={blogStyles.bookmarkDescription}>
                    {description}
                  </div>
                  <div className={blogStyles.bookmarkLinkWrapper}>
                    <img src={icon} className={blogStyles.bookmarkLinkIcon} />
                    <div className={blogStyles.bookmarkLink}>{link}</div>
                  </div>
                </div>
                <div className={blogStyles.bookmarkCoverWrapper1}>
                  <div className={blogStyles.bookmarkCoverWrapper2}>
                    <div className={blogStyles.bookmarkCoverWrapper3}>
                      <img src={cover} className={blogStyles.bookmarkCover} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const switchRender = (block, blockIdx) => {
    const { value } = block
    const { type, properties, id, parent_id } = value

    switch (type) {
      case 'page':
      case 'divider':
        break
      case 'text':
        if (properties) {
          return textBlock(properties.title, false, id)
        }
        break
      case 'image':
        if (!properties.title) {
          return <img src={properties.source[0]} />
        }

      case 'video':
      case 'embed': {
        const { format = {} } = value
        const {
          block_width,
          block_height,
          display_source,
          block_aspect_ratio,
        } = format
        const baseBlockWidth = 768
        const roundFactor = Math.pow(10, 2)
        // calculate percentages
        const width = block_width
          ? `${
              Math.round((block_width / baseBlockWidth) * 100 * roundFactor) /
              roundFactor
            }%`
          : block_height || '100%'

        const isImage = type === 'image'
        const Comp = isImage ? 'img' : 'video'
        const useWrapper = block_aspect_ratio && !block_height
        const childStyle: CSSProperties = useWrapper
          ? {
              width: '100%',
              height: '100%',
              border: 'none',
              position: 'absolute',
              top: 0,
            }
          : {
              width,
              border: 'none',
              height: block_height,
              display: 'block',
              maxWidth: '100%',
            }

        let child = null

        if (!isImage && !value.file_ids) {
          // external resource use iframe
          child = (
            <iframe
              style={childStyle}
              src={display_source}
              key={!useWrapper ? id : undefined}
              className={!useWrapper ? 'asset-wrapper' : undefined}
            />
          )
        } else {
          // notion resource
          child = (
            <Comp
              key={!useWrapper ? id : undefined}
              src={`/api/asset?assetUrl=${encodeURIComponent(
                display_source as any
              )}&blockId=${id}`}
              controls={!isImage}
              alt={`An ${isImage ? 'image' : 'video'} from Notion`}
              loop={!isImage}
              muted={!isImage}
              autoPlay={!isImage}
              style={childStyle}
            />
          )
        }

        return useWrapper ? (
          <div
            style={{
              paddingTop: `${Math.round(block_aspect_ratio * 100)}%`,
              position: 'relative',
            }}
            className="asset-wrapper"
            key={id}
          >
            {child}
          </div>
        ) : (
          child
        )
      }
      case 'header':
        return renderHeading(block, blockIdx, 'h1')
      case 'sub_header':
        return renderHeading(block, blockIdx, 'h2')
      case 'sub_sub_header':
        return renderHeading(block, blockIdx, 'h3')
      case 'bookmark':
        const { link, title, description } = properties
        const { format = {} } = value
        return renderBookmark({ link, title, description, format })
      case 'code': {
        if (properties.title) {
          const content = properties.title[0][0]
          const language = properties.language[0][0]

          if (language === 'LiveScript') {
            // this requires the DOM for now
            return (
              <ReactJSXParser
                key={id}
                jsx={content}
                components={components}
                componentsOnly={false}
                renderInpost={false}
                allowUnknownElements={true}
                blacklistedTags={['script', 'style']}
              />
            )
          } else {
            return (
              <components.Code key={id} language={language || ''}>
                {content}
              </components.Code>
            )
          }
        }
        break
      }
      case 'quote': {
        if (properties.title) {
          return React.createElement(
            components.blockquote,
            { key: id },
            properties.title
          )
        }
        break
      }
      case 'callout': {
        return (
          <div className="callout" key={id}>
            {value.format?.page_icon && <div>{value.format?.page_icon}</div>}
            <div className="text">{textBlock(properties.title, true, id)}</div>
          </div>
        )
      }
      case 'tweet': {
        if (properties.html) {
          return (
            <div
              dangerouslySetInnerHTML={{ __html: properties.html }}
              key={id}
            />
          )
        }
      }
      case 'equation': {
        if (properties && properties.title) {
          const content = properties.title[0][0]
          return (
            <components.Equation key={id} displayMode={true}>
              {content}
            </components.Equation>
          )
        }
      }
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

      toRender.push(switchRender(block, blockIdx))
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
