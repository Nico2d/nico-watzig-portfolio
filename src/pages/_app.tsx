import { ThemeContext } from '@/context/themeContext'
import { Analytics } from '@vercel/analytics/next'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<ThemeContext>
				<div className="min-h-screen flex flex-col justify-between">
					<Component {...pageProps} />
				</div>

				<Analytics />
			</ThemeContext>
		</>
	)
}
