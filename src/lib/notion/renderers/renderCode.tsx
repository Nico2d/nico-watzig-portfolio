import ReactJSXParser from '@zeit/react-jsx-parser'
import components from '../../../components/dynamic'

export const renderCode = (block) => {
  const { value } = block
  const { properties, id } = value

  console.log('code snipped')

  if (properties.title) {
    const content = properties.title[0][0]
    const language = properties.language[0][0]

    if (language === 'LiveScript') {
      // this requires the DOM for now
      return (
        <ReactJSXParser
          key={id}
          jsx={content}
          components={components}
          componentsOnly={false}
          renderInpost={false}
          allowUnknownElements={true}
          blacklistedTags={['script', 'style']}
        />
      )
    } else {
      return (
        <components.Code key={id} language={language || ''}>
          {content}
        </components.Code>
      )
    }
  }
}
