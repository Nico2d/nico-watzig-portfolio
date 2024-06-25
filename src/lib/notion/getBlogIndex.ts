import { Sema } from 'async-sema'
import rpc, { values } from './rpc'
import getTableData from './getTableData'
import { getPostPreview } from './getPostPreview'
import { readFile, writeFile } from '../fs-helpers'
import { BLOG_INDEX_ID, BLOG_INDEX_CACHE } from './server-constants'

export default async function getBlogIndex(previews = true) {
  let postsTable: any = null
  const useCache = process.env.USE_CACHE === 'true'
  const cacheFile = `${BLOG_INDEX_CACHE}${previews ? '_previews' : ''}`

  if (useCache) {
    try {
      postsTable = JSON.parse(await readFile(cacheFile, 'utf8'))
    } catch (_) {
      /* not fatal */
    }
  }

  if (!postsTable) {
    try {
      const data = await rpc('loadPageChunk', {
        pageId: BLOG_INDEX_ID,
        limit: 100, // TODO: figure out Notion's way of handling pagination
        cursor: { stack: [] },
        chunkNumber: 0,
        verticalColumns: false,
      })

      postsTable = getPostsTable(data.recordMap.block)
    } catch (err) {
      console.warn(
        `Failed to load Notion posts, have you run the create-table script?`
      )
      return {}
    }

    // only get 10 most recent post's previews
    const postsKeys = Object.keys(postsTable).splice(0, 10)

    const sema = new Sema(3, { capacity: postsKeys.length })

    if (previews) {
      await Promise.all(
        postsKeys
          .sort((a, b) => {
            const postA = postsTable[a]
            const postB = postsTable[b]
            const timeA = postA.Date
            const timeB = postB.Date
            return Math.sign(timeB - timeA)
          })
          .map(async (postKey) => {
            await sema.acquire()
            const post = postsTable[postKey]
            post.preview = post.id
              ? await getPostPreview(postsTable[postKey].id)
              : []
            sema.release()
          })
      )
    }

    if (useCache) {
      writeFile(cacheFile, JSON.stringify(postsTable), 'utf8').catch(() => {})
    }
  }

  return postsTable
}

// refactor:

const BlockType = {
  CollectionViewPage: 'collection_view_page',
  CollectionView: 'collection_view',
}

const getPostsTable = async (recordMapBlocks) => {
  const tableBlock = findTableBlock(recordMapBlocks)

  if (!tableBlock) {
    throw new Error('No table block found')
  }

  const { collectionId, viewId } = extractCollectionAndViewIds(tableBlock)

  return await getTableData(collectionId, viewId, true)
}

const findTableBlock = (recordMapBlocks) => {
  return values(recordMapBlocks).find((block) => {
    return [BlockType.CollectionViewPage, BlockType.CollectionView].includes(
      block.value.type
    )
  })
}

const extractCollectionAndViewIds = (tableBlock) => {
  const { type, format, collection_id, view_ids } = tableBlock.value

  if (type === BlockType.CollectionViewPage) {
    return {
      collectionId: format.collection_pointer.id,
      viewId: view_ids[0],
    }
  } else if (type === BlockType.CollectionView) {
    return {
      collectionId: collection_id,
      viewId: view_ids[0],
    }
  } else {
    throw new Error('Unsupported table block type')
  }
}
