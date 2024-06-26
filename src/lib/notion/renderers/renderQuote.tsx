import React from 'react'
import components from '../../../components/dynamic'

export const renderQuote = (block) => {
  const { value } = block
  const { type, properties, id } = value

  if (properties.title) {
    return React.createElement(
      components.blockquote,
      { key: id },
      properties.title
    )
  }
}
