import { AboutSection, TechnologiesSection } from '@/components/sections'
import LandingSection from '@/components/sections/landing/LandingSection'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useState } from 'react'

export default function Index() {
	const [isLandingUnlock, setIsLandingUnlock] = useState(false)
	const resolution = useWindowSize()

	return (
		<>
			<LandingSection
				isLandingUnlock={isLandingUnlock}
				setIsLandingUnlock={setIsLandingUnlock}
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
