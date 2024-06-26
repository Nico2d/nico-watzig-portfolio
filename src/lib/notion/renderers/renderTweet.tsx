export const renderTweet = (block) => {
  const { value } = block
  const { properties, id } = value

  if (properties.html) {
    return (
      <div dangerouslySetInnerHTML={{ __html: properties.html }} key={id} />
    )
  }
}
