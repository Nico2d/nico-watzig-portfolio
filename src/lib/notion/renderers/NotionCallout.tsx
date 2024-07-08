import { INotionComponent } from '../../../types/notion.types'
import { NotionText } from './NotionText'

export const NotionCallout = ({ block }: INotionComponent) => {
	const { value } = block
	const { id } = value

	return (
		<div className="callout" key={id}>
			{value.format?.page_icon && <div>{value.format?.page_icon}</div>}
			<div className="text">
				<NotionText block={block} tag={'span'} />
			</div>
		</div>
	)
}
 