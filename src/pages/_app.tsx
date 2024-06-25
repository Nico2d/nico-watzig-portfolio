import '../styles/globals.css'
import 'katex/dist/katex.css'
import Footer from '../components/footer'
import { ThemeContext } from '../context/themeContext'

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeContext>
      <div className="container-md space-y-8">
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeContext>
  )
}
