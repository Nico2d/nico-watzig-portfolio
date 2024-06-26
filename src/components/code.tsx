import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'

const Code = ({ children, language = 'javascript' }) => {
  return (
    <pre className="code-snipped">
      <code
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(
            children,
            Prism.languages[language.toLowerCase()] ||
              Prism.languages.javascript
          ),
        }}
      />
    </pre>
  )
}

export default Code
