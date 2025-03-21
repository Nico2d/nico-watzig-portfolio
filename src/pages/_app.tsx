import Footer from '@/components/footer'
import { ThemeContext } from '@/context/themeContext'
import { Analytics } from '@vercel/analytics/next'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<ThemeContext>
				<Component {...pageProps} />
				<Footer />
				<Analytics />
			</ThemeContext>
		</>
	)
}
