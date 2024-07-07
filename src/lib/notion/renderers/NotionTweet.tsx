import { INotionComponent } from "../../../types/notion.types"

export const NotionTweet = ({block}: INotionComponent) => {
  const { value } = block
  const { properties, id } = value

  if (properties.html) {
    return (
      <div dangerouslySetInnerHTML={{ __html: properties.html }} key={id} />
    )
  }
}
