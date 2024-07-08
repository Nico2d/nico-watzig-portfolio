import { useNotionRender, pageContent } from '../../../hooks/useNotionRender'
import { IBlock } from '../../../types/notion.types'

interface INotionList {
	block: IBlock
	postId: string
}

export const NotionList2 = ({ block, postId }: INotionList) => {
	const { switchRender } = useNotionRender({} as pageContent)
	const { value } = block

	const ListType = value.type === 'bulleted_list' ? 'ul' : 'ol'

	// console.log('NotionList2')
	// console.log(value)
	// console.log(value.contentBlock)

	const contentBlock = value.contentBlock ?? []

	return (
		<ListType
			key={value.id + 'wrapperListType'}
			className={`ml-6 ${
				ListType === 'ul' ? 'list-disc' : 'list-decimal'
			}`}
		>
			<li>{value.properties.title}</li>
			{contentBlock.map((block, idx) => switchRender(block, idx))}
		</ListType>
	)
}
