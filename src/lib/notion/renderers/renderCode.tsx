import { CopyBlock, dracula } from 'react-code-blocks'

export const renderCode = (block) => {
  const { value } = block
  const { properties } = value

  if (properties.title) {
    const content = properties.title[0][0]
    const language = properties.language[0][0]

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
}
