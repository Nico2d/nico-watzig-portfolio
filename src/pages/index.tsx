import { AboutSection, TechnologiesSection } from '@/components/sections'
import { useState } from 'react'
import Landing from './landing'

export default function Index() {
	const [isLandingUnlock, setIsLandingUnlock] = useState(false)

	return (
		<>
			<Landing
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
