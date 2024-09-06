import { DiscoverButton } from '@/components/DiscoverButton'
import { Header } from '@/components/header'
import { WelcomeSection } from '@/components/sections'
import { ParallaxFace } from '@/components/sections/landing/ParallaxFace'
import { WelcomeText } from '@/components/sections/landing/WelcomeText'

export default function Landing({ isLandingUnlock, setIsLandingUnlock }) {
	return (
		<>
			{isLandingUnlock ? <Header /> : null}

			<div className="parallax-container h-screen flex flex-col flex-col-reverse lg:flex-row bg-landingLockRightBackground">
				<div className="relative lg:w-[350px] h-1/4 lg:h-full bg-black left-section z-10">
					<WelcomeText />
				</div>

				<ParallaxFace isLocked={isLandingUnlock} />
			</div>

			<DiscoverButton
				size={80}
				onClick={() => {
					setIsLandingUnlock(!isLandingUnlock)
				}}
				isLandingUnlock={isLandingUnlock}
			/>

			{isLandingUnlock ? (
				<div className="absolute top-1/2 -translate-y-1/2 left-[100px] z-40">
					<WelcomeSection />
				</div>
			) : null}
		</>
	)
}
