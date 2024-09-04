import { useState } from 'react'
import { ParallaxFace } from '../components/sections/landing/ParallaxFace'
import { DiscoverButton } from '../components/DiscoverButton'
import { WelcomeText } from '../components/sections/landing/WelcomeText'

export default function Landing() {
	const [isLandingAnimating, setIsLandingAnimating] = useState(false)

	return (
		<>
			<div className="parallax-container h-screen flex flex-col flex-col-reverse lg:flex-row">
				<WelcomeText />
				<ParallaxFace isLocked={isLandingAnimating} />
			</div>

			<DiscoverButton
				size={80}
				onClick={() => {
					setIsLandingAnimating(!isLandingAnimating)
				}}
				isLandingAnimating={isLandingAnimating}
			/>
		</>
	)
}
