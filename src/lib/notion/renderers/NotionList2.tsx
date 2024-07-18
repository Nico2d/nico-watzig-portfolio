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
	const contentBlock = value.contentBlock ?? []
	const title = value.properties?.title

	return (
		<ListType
			key={value.id + 'wrapperListType'}
			className={`ml-6 space-y-3 ${
				ListType === 'ul' ? 'list-disc' : 'list-decimal'
			}`}
		>
			{title && <li>{title}</li>}
			{contentBlock.map((block, idx) => switchRender(block, idx))}
		</ListType>
	)
}
