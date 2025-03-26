'use client'

import { AboutSection, TechnologiesSection } from '@/components/sections'
import LandingSection from '@/components/sections/landing/LandingSection'
import { TestUI } from '@/components/ui/TestUi'
import { useState, useEffect } from 'react'

const HomePage = () => {
	console.log('This is my Home page :D')

	// console.log('window:', window.innerWidth)

	const [isLandingUnlock, setIsLandingUnlock] = useState(false)
	// const { isMobile } = useWindowSize()

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
		<div>
			{/* Home Page
			<TestUI /> */}

			<LandingSection
				isLandingUnlock={isLandingUnlock}
				setIsLandingUnlock={saveIsLandingUnlock}
			/>

			<TestUI />

			{/* {isLandingUnlock || isMobile ? ( */}
			<div className="container mx-auto px-4 space-y-8">
				<AboutSection />
				<TechnologiesSection />
			</div>
			{/* ) : null} */}
		</div>
	)
}

export default HomePage
