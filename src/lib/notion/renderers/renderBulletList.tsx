export const renderBulletList = (block, postId) => {
	const { listCollection } = block.value

	const listCollectionLevel1 = listCollection.filter(
		(item) => item?.value?.parent_id === postId
	)

	return (
		<ul className="max-w-md list-disc ml-6">
			{listCollectionLevel1.map((block) => {
				return getRenderBlockAsListItem(block, listCollection)
			})}
		</ul>
	)
}

const getRenderBlockAsListItem = (block, listCollection) => {
	const listContent = block?.value?.content ?? []

	if (listContent.length > 0) {
		return (
			<>
				<NotionLI block={block} />
				<NotionUL block={block} listCollection={listCollection} />
			</>
		)
	}

	return <NotionLI block={block} />
}

const NotionUL = ({ block, listCollection }) => {
	const listWithContent = block.value.content.map((contentItem) => {
		const contentBlock = listCollection.find(
			(item) => item.value.id === contentItem
		)

		return getRenderBlockAsListItem(contentBlock, listCollection)
	})

	return <ul className="max-w-md list-disc ml-6">{listWithContent}</ul>
}

const NotionLI = ({ block }) => {
	return <li>{block.value.properties.title[0][0]}</li>
}
