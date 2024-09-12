import { INotionComponent } from '../../../types/notion.types'

export const NotionEquation = ({ block }: INotionComponent) => {
	const { value } = block
	const { properties, id } = value

	if (properties && properties.title) {
		const content = properties.title[0][0]
		return <span key={id}>{content}</span>
	}

	return <></>
}
