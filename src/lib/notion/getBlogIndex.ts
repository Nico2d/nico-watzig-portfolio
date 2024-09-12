import rpc, { values } from './rpc'
import getTableData from './getTableData'
import { BLOG_INDEX_ID } from './server-constants'
import { IPageChunk } from '../../types/notion.types'

export default async function getBlogIndex(previews = true) {
	let postsTable: any = null

	if (!postsTable) {
		try {
			const data: IPageChunk = await rpc<IPageChunk>('loadPageChunk', {
				pageId: BLOG_INDEX_ID,
				limit: 100,
				cursor: { stack: [] },
				chunkNumber: 0,
				verticalColumns: false,
			})

			postsTable = await getPostsTable(data.recordMap.block)
		} catch (err) {
			console.warn(
				`Failed to load Notion posts, have you run the create-table script?`
			)
			return {}
		}
	}

	return postsTable
}

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
		return [
			BlockType.CollectionViewPage,
			BlockType.CollectionView,
		].includes(block.value.type)
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
