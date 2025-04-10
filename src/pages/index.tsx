import Head from 'next/head'
import openGraphImage from '@images/Opengraph-image.png'
import { HomeTemplate } from '@/components/template/HomeTemplate'
import { ParallaxHeroProvider } from '@/stores/parallaxHero/ParallaxHeroProvider'

export default function Index() {
	return (
		<>
			<Head>
				<title>Portfolio | Nico Wätzig</title>
				<meta
					name="description"
					content="Welcome to my website, where you may discover information about me, the technologies and projects on which I work."
					key="desc"
				/>
				<meta property="og:title" content="Portfolio | Nico Wätzig" />
				<meta
					property="og:description"
					content="Welcome to my website, where you may discover information about me, the technologies and projects on which I work."
				/>
				<meta property="og:image" content={openGraphImage.src} />
			</Head>

			<main>
				<ParallaxHeroProvider>
					<HomeTemplate />
				</ParallaxHeroProvider>
			</main>
		</>
	)
}
