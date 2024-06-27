export const renderList = (block, postId) => {
	const { listCollection } = block.value

	const ListType =
		listCollection[0].value.type === 'bulleted_list' ? 'ul' : 'ol'

	const listCollectionLevel1 = listCollection.filter(
		(item) => item?.value?.parent_id === postId
	)

	return (
		<ListType
			className={`max-w-md ml-6 ${
				ListType === 'ul' ? 'list-disc' : 'list-decimal'
			}`}
		>
			{listCollectionLevel1.map((block) => {
				return getRenderBlockAsListItem(block, listCollection, ListType)
			})}
		</ListType>
	)
}

const getRenderBlockAsListItem = (block, listCollection, ListType) => {
	const listContent = block?.value?.content ?? []

	if (listContent.length > 0) {
		return (
			<>
				<NotionLI block={block} />
				<NotionUL
					block={block}
					listCollection={listCollection}
					ListType={ListType}
				/>
			</>
		)
	}

	return <NotionLI block={block} />
}

const NotionUL = ({ block, listCollection, ListType }) => {
	const listWithContent = block.value.content.map((contentItem) => {
		const contentBlock = listCollection.find(
			(item) => item.value.id === contentItem
		)

		return getRenderBlockAsListItem(contentBlock, listCollection, ListType)
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
	return <li>{block.value.properties.title[0][0]}</li>
}
