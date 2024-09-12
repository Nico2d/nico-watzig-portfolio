import { Header } from '@/components/header'
import Landscape from '@/components/svgs/landscape'
import { ContactIcons } from '@/components/ui/ContactIcons'
import Head from 'next/head'
import openGraphImage from '@images/Opengraph-image.png'

export default function Contact() {
	return (
		<>
			<Head>
				<title>Contact | Nico Wätzig</title>
				<meta
					name="description"
					content="Welcome to my website, where you may discover information about me, the technologies and projects on which I work."
					key="desc"
				/>
				<meta
					property="og:title"
					content={`Contact | Nico Wätzig`}
				/>
				<meta
					property="og:description"
					content="Welcome to my website, where you may discover information about me, the technologies and projects on which I work."
				/>
				<meta property="og:image" content={openGraphImage.src} />
			</Head>
			
			<Header />
			<div className="container-md space-y-8 mt-60">
				<h1 className="text-6xl bold mt-20 mb-8">Contact</h1>

				<ContactIcons />

				<div className="fixed -bottom-50 md:-bottom-20 -right-20 md:-right-6 h-screen aspect-square -z-10">
					<Landscape />
				</div>
			</div>
		</>
	)
}
