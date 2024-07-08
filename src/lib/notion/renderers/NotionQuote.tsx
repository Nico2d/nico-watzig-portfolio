import React from 'react'
import components from '../../../components/dynamic'
import { INotionComponent } from '../../../types/notion.types'

export const NotionQuote = ({ block }: INotionComponent) => {
	const { value } = block
	const { properties, id } = value

	if (properties.title) {
		return React.createElement(
			components.blockquote,
			{ key: id },
			properties.title
		)
	}
}
