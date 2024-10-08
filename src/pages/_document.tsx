import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<Script
						id="gtm"
						strategy="afterInteractive"
						dangerouslySetInnerHTML={{
							__html: `
									(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
								new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
								j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
								'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
								})(window,document,'script','dataLayer','GTM-KPLMX2XJ');
				`,
						}}
					></Script>
					<meta
						name="description"
						content="Nico Wätzig's Portfolio webpage. Check out my history and the projects and technologies I've worked with."
					/>
					<meta name="og:title" content="Nico Wätzig Portfolio" />
					<meta
						name="google-site-verification"
						content="9VA0PUJUy0c5fHKe8w_Hc9l7lCzkoSXISPeDb0oCAIY"
					/>
				</Head>

				<body>
					<Script
						id="gtm"
						strategy="afterInteractive"
						dangerouslySetInnerHTML={{
							__html: `
									(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
								new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
								j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
								'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
								})(window,document,'script','dataLayer','GTM-KPLMX2XJ');
				`,
						}}
					></Script>
					<Main />
					<NextScript />x
				</body>
			</Html>
		)
	}
}

export default MyDocument
