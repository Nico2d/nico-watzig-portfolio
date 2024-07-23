import '../styles/globals.css'
import Footer from '../components/footer'
import { ThemeContext } from '../context/themeContext'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function MyApp({ Component, pageProps }) {
	return (
		<ThemeContext>
			<div className="container-md space-y-8">
				<Component {...pageProps} />
				<Footer />
			</div>
			<SpeedInsights />
		</ThemeContext>
	)
}
