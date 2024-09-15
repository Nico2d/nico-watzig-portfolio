import Footer from '@/components/footer'
import { ThemeContext } from '@/context/themeContext'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<ThemeContext>
				<Component {...pageProps} />
				<Footer />
			</ThemeContext>
		</>
	)
}
