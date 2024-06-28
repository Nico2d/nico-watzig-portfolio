import { renderText } from './renderText'

export const renderCallout = (block) => {
	const { value } = block
	const { id } = value

	return (
		<div className="callout" key={id}>
			{value.format?.page_icon && <div>{value.format?.page_icon}</div>}
			<div className="text">{renderText(block, 'span')}</div>
		</div>
	)
}
