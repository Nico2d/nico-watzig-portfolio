import { ThemeContext } from '@/context/themeContext'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer/Footer'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<ThemeContext>
				<div className="min-h-screen flex flex-col justify-between">
					<Component {...pageProps} />
					<Footer />
				</div>

				<Analytics />
			</ThemeContext>
		</>
	)
}
