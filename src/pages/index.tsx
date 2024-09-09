import { AboutSection, TechnologiesSection } from '@/components/sections'
import LandingSection from '@/components/sections/landing/LandingSection'
import { useState } from 'react'

export default function Index() {
	const [isLandingUnlock, setIsLandingUnlock] = useState(false)

	return (
		<>
			<LandingSection
				isLandingUnlock={isLandingUnlock}
				setIsLandingUnlock={setIsLandingUnlock}
			/>

			{isLandingUnlock ? (
				<div className="container-md space-y-8">
					<AboutSection />
					<TechnologiesSection />
				</div>
			) : null}
		</>
	)
}
