import { ParallaxFace } from '../components/sections/landing/ParallaxFace'
import { DiscoverButton } from '../components/DiscoverButton'
import { WelcomeText } from '../components/sections/landing/WelcomeText'
import { WelcomeSection } from '../components/sections'
import { Header } from '../components/header'

export default function Landing({ isLandingLock, setIsLandingLock }) {
	return (
		<>
			{isLandingLock ? <Header /> : null}

			<div className="parallax-container h-screen flex flex-col flex-col-reverse lg:flex-row">
				<div className="relative lg:w-[350px] h-1/4 lg:h-full bg-black left-section z-10">
					<WelcomeText />
				</div>

				<ParallaxFace isLocked={isLandingLock} />
			</div>

			<DiscoverButton
				size={80}
				onClick={() => {
					setIsLandingLock(!isLandingLock)
				}}
				isLandingAnimating={isLandingLock}
			/>

			{isLandingLock ? (
				<div className="absolute top-1/2 -translate-y-1/2 left-[100px] z-40">
					<WelcomeSection />
				</div>
			) : null}
		</>
	)
}
