import Footer from '@/components/footer'
import { ThemeContext } from '@/context/themeContext'
import '../styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Nico Wätzig - Portfolio</title>
			</Head>

			<ThemeContext>
				<Component {...pageProps} />
				<Footer />
				<SpeedInsights />
			</ThemeContext>
		</>
	)
}
