import { CopyBlock, dracula } from 'react-code-blocks'
import { INotionComponent } from '../../../types/notion.types'

export const NotionCode = ({ block }: INotionComponent) => {
	const { value } = block
	const { properties } = value

	if (properties.title) {
		const content = properties.title[0][0]
		const language = properties.language?.[0][0] ?? ''

		return (
			<div className="code-snipped" key={value.id}>
				<CopyBlock
					codeBlock={true}
					text={content}
					language={language}
					showLineNumbers={false}
					theme={dracula}
				/>
			</div>
		)
	}

	return <></>
}
