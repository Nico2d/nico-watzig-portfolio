import { IBlock } from '../../../types/notion.types'

interface INotionList {
	block: IBlock
	postId: string
}

export const NotionList = ({ block, postId }: INotionList) => {
	const { listCollection } = block.value

	const ListType =
		listCollection?.[0].value.type === 'bulleted_list' ? 'ul' : 'ol'

	const listCollectionLevel1 = listCollection?.filter(
		(item) => item?.value?.parent_id === postId
	)

	return (
		<ListType
			key={listCollection?.[0].value.id + 'wrapperListType'}
			className={`max-w-md ml-6 ${
				ListType === 'ul' ? 'list-disc' : 'list-decimal'
			}`}
		>
			{listCollectionLevel1?.map((block, idx: number) => (
				<BlockList
					key={idx}
					block={block}
					blocksCollection={listCollection}
					listType={ListType}
				/>
			))}
		</ListType>
	)
}

const BlockList = ({ block, blocksCollection, listType }) => {
	const listContent = block?.value?.content ?? []

	if (listContent.length > 0) {
		return (
			<>
				<NotionLI key={`LI-${block.value.id}`} block={block} />
				<NotionUL
					key={`UL-${block.value.id}`}
					block={block}
					listCollection={blocksCollection}
					ListType={listType}
				/>
			</>
		)
	}

	return <NotionLI key={`LI-${block?.value?.id}`} block={block} />
}

const NotionUL = ({ block, listCollection, ListType }) => {
	const listWithContent = block.value.content.map((contentItem) => {
		const contentBlock = listCollection.find(
			(item) => item.value.id === contentItem
		)

		if (!contentBlock) {
			return
		}

		return (
			<BlockList
				block={contentBlock}
				blocksCollection={listCollection}
				listType={ListType}
			/>
		)
	})

	return (
		<ListType
			className={`max-w-md ml-6 ${
				ListType === 'ul' ? 'list-disc' : 'list-decimal'
			}`}
		>
			{listWithContent}
		</ListType>
	)
}

const NotionLI = ({ block }) => {
	return <li>{block?.value?.properties?.title?.[0]?.[0]}</li>
}
