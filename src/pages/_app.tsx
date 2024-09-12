import Footer from '@/components/footer'
import { ThemeContext } from '@/context/themeContext'
import '../styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<ThemeContext>
				<Component {...pageProps} />
				<Footer />
				<SpeedInsights />
			</ThemeContext>
		</>
	)
}
