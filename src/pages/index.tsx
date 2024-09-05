import { useState } from 'react'
import { AboutSection } from '../components/sections/about'
import { TechnologiesSection } from '../components/sections/technologies'
import Landing from './landing'

export default function Index() {
	const [isLandingLock, setIsLandingLock] = useState(true)

	return (
		<>
			<Landing
				isLandingLock={isLandingLock}
				setIsLandingLock={setIsLandingLock}
			/>

			{isLandingLock ? (
				<div className="container-md space-y-8">
					<AboutSection />
					<TechnologiesSection />
				</div>
			) : null}
		</>
	)
}
