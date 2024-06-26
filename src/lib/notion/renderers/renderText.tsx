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

const determineTag = (
  tag: React.ElementType,
  attributes: string[]
): React.ElementType => {
  return attributes.includes('c') ? 'span' : tag
}

export const renderText = (
  block: {
    value: {
      id: string
      properties?: { title: [string, any[]][] }
    }
  },
  tag: React.ElementType = 'p'
) => {
  const { value } = block

  if (!value.properties) {
    return <p key={value.id} className="notion-wrapper"></p>
  }

  const title = value.properties.title[0]
  const text = title[0]
  const attributes = title?.[1]?.[0] ?? []

  const Tag = determineTag(tag, attributes)
  const className = getClassNamesFromAttributes(attributes).join(' ')

  return (
    <Tag key={value.id} className={'notion-wrapper ' + className}>
      {text}
    </Tag>
  )
}
