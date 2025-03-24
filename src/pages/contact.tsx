import { Header } from '@/components/header/Header'
import Head from 'next/head'
import openGraphImage from '@images/Opengraph-image.png'
import { ContactForm } from '@/components/forms/ContactForm'

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
				<meta property="og:title" content={`Contact | Nico Wätzig`} />
				<meta
					property="og:description"
					content="Welcome to my website, where you may discover information about me, the technologies and projects on which I work."
				/>
				<meta property="og:image" content={openGraphImage.src} />
			</Head>

			<Header />
			<div className="container mx-auto px-4 space-y-8 mt-24 lg:mt-48">
				<ContactForm />
			</div>
		</>
	)
}
