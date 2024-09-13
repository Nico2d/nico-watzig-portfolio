import Footer from '@/components/footer'
import { ThemeContext } from '@/context/themeContext'
import '../styles/globals.css'
import Script from 'next/script'

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Script
				id="gtm"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KPLMX2XJ');`,
				}}
			></Script>

			<ThemeContext>
				<Component {...pageProps} />
				<Footer />
			</ThemeContext>
		</>
	)
}
