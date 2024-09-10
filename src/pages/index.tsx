import { AboutSection, TechnologiesSection } from '@/components/sections'
import LandingSection from '@/components/sections/landing/LandingSection'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useEffect, useState } from 'react'

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
