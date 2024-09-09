import { DiscoverButton } from '@/components/DiscoverButton'
import { Header } from '@/components/header'
import { ParallaxFace } from '@/components/sections/landing/ParallaxFace'
import { WelcomeSection } from '@/components/sections/landing/WelcomeSection'
import { WelcomeText } from '@/components/sections/landing/WelcomeText'
import { useWindowSize } from '@/hooks/useWindowSize'

export default function LandingSection({
	isLandingUnlock,
	setIsLandingUnlock,
}) {
	return (
		<>
			{isLandingUnlock ? <Header /> : null}

			<div className="parallax-container h-screen flex flex-col-reverse lg:flex-row bg-landingLockRightBackground">
				<div className="relative lg:w-[350px] h-1/4 lg:h-full bg-black left-section z-10">
					<WelcomeText className="max-lg:hidden" />
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
