import { pageContent, useNotionRender } from '../../../hooks/useNotionRender'
import { IBlock, INotionComponent } from '../../../types/notion.types'

export const NotionColumnList = ({ block }: INotionComponent) => {
	const { switchRender } = useNotionRender({} as pageContent)
	const { contentBlock } = block.value

	return (
		<div className="flex flex-row gap-3">
			{contentBlock?.map((column: IBlock) => {
				const ratio = column.value.format?.column_ratio

				return (
					<div style={{ flex: ratio }} key={column.value.id}>
						{column.value.contentBlock?.map((block) => {
							return switchRender(block)
						})}
					</div>
				)
			})}
		</div>
	)
}
