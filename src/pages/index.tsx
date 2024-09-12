import { AboutSection, TechnologiesSection } from '@/components/sections'
import LandingSection from '@/components/sections/landing/LandingSection'
import { useWindowSize } from '@/hooks/useWindowSize'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import openGraphImage from '@images/Opengraph-image.png'

export default function Index() {
	const [isLandingUnlock, setIsLandingUnlock] = useState(false)
	const resolution = useWindowSize()

	const saveIsLandingUnlock = (value: boolean) => {
		localStorage.setItem('isLandingUnlock', value.toString())
		setIsLandingUnlock(value)
	}

	useEffect(() => {
		const storedValue = localStorage.getItem('isLandingUnlock')
		if (storedValue) {
			setIsLandingUnlock(storedValue === 'true')
		}
	}, [])

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

			<LandingSection
				isLandingUnlock={isLandingUnlock}
				setIsLandingUnlock={saveIsLandingUnlock}
			/>

			{isLandingUnlock || resolution.width < 1024 ? (
				<div className="container-md space-y-8">
					<AboutSection />
					<TechnologiesSection />
				</div>
			) : null}
		</>
	)
}
