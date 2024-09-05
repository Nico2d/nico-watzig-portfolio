import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta
						name="description"
						content="Nico Wätzig's Portfolio webpage. Check out my history and the projects and technologies I've worked with."
					/>
					<meta name="og:title" content="Nico Wätzig Portfolio" />
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
