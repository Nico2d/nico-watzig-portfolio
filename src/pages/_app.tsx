import Footer from '@/components/footer'
import { ThemeContext } from '@/context/themeContext'
import '../styles/globals.css'
import { GoogleTagManager } from '@next/third-parties/google'

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<ThemeContext>
				<Component {...pageProps} />
				<Footer />
			</ThemeContext>
			
			<GoogleTagManager gtmId={"G-FJY7MTPG18"}/>
		</>
	)
}
