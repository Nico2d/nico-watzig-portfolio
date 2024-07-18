import Link from 'next/link'
import { IBlock } from '../../../types/notion.types'

const attributeClassMap: Record<string, string> = {
	gray: 'notion-gray',
	brown: 'notion-brown',
	orange: 'notion-orange',
	yellow: 'notion-yellow',
	teal: 'notion-green',
	blue: 'notion-blue',
	purple: 'notion-purple',
	pink: 'notion-pink',
	red: 'notion-red',
	c: 'code',
	gray_background: 'notion-gray-background',
	brown_background: 'notion-brown-background',
	orange_background: 'notion-orange-background',
	yellow_background: 'notion-yellow-background',
	teal_background: 'notion-green-background',
	blue_background: 'notion-blue-background',
	purple_background: 'notion-purple-background',
	pink_background: 'notion-pink-background',
	red_background: 'notion-red-background',
	i: 'italic',
}

const getClassNamesFromAttributes = (attributes: string[]): string[] => {
	return attributes.reduce((classNames: string[], attribute: string) => {
		if (attribute === 'h') {
		} else if (attributeClassMap[attribute]) {
			classNames.push(attributeClassMap[attribute])
		} else {
			console.log('missing attribute: ', attribute)
		}
		return classNames
	}, [])
}

interface INotionText {
	block: IBlock
	tag?: React.ElementType
}

export const NotionText = ({ block, tag = 'span' }: INotionText) => {
	const { value } = block

	if (!value.properties) {
		return <div key={value.id} className='h-6'></div>
	}

	const subBlocks = value.properties.title

	return (
		<div>
			{subBlocks.map((subBlockTitle, idx) => {
				let [text, attributes] = subBlockTitle

				return (
					<DynamicTextTag
						key={idx}
						Tag={tag}
						attributes={attributes ? attributes.flat() : []}
					>
						{text}
					</DynamicTextTag>
				)
			})}
		</div>
	)
}

const DynamicTextTag = ({ Tag, attributes, children }) => {
	const classNamesArray = [
		'text-wrap',
		'whitespace-pre-wrap',
		...getClassNamesFromAttributes(attributes),
	]

	const classNamesString = classNamesArray.join(' ')

	if (attributes.includes('a')) {
		return (
			<Link
				href={attributes[1]}
				className={'custom-link ' + classNamesString}
			>
				{children}
			</Link>
		)
	} else if (attributes.includes('c')) {
		return <span className={classNamesString}>{children}</span>
	}

	return <Tag className={classNamesString}>{children}</Tag>
}
