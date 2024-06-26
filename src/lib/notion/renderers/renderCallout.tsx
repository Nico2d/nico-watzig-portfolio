import { textBlock } from '../renderers'

export const renderCallout = (block) => {
  const { value } = block
  const { properties, id } = value

  return (
    <div className="callout" key={id}>
      {value.format?.page_icon && <div>{value.format?.page_icon}</div>}
      <div className="text">{textBlock(properties.title, true, id)}</div>
    </div>
  )
}
