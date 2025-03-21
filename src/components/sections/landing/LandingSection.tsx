import { Header } from '@/components/header'
import { ParallaxFace } from '@/components/sections/landing/ParallaxFace'
import { WelcomeSection } from '@/components/sections/landing/WelcomeSection'
import { WelcomeText } from '@/components/sections/landing/WelcomeText'
import { DiscoverButton } from '@/components/ui/DiscoverButton'
import { useWindowSize } from '@/hooks/useWindowSize'
import { MobileLandingInfo } from './MobileLandingInfo'

export default function LandingSection({
	isLandingUnlock,
	setIsLandingUnlock,
}) {
	const res = useWindowSize()
	const isMobileResolution = res.width < 1024

	return (
		<>
			{isLandingUnlock && !isMobileResolution ? <Header /> : null}

			<div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden lg:flex lg:flex-row bg-landingLockRightBackground">
				{!isMobileResolution ? (
					<div className="relative lg:w-[350px] h-1/4 lg:h-full left-section z-10">
						<WelcomeText className="max-lg:hidden" />
					</div>
				) : null}

				<ParallaxFace
					isLocked={isLandingUnlock && !isMobileResolution}
				/>

				<MobileLandingInfo />
			</div>

			<div className="h-screen"></div>

			<DiscoverButton
				size={80}
				onClick={() => {
					setIsLandingUnlock(!isLandingUnlock)
				}}
				isLandingUnlock={isLandingUnlock}
			/>

			{isLandingUnlock && !isMobileResolution ? (
				<div className="absolute top-1/2 -translate-y-1/2 left-[100px] z-40">
					<WelcomeSection />
				</div>
			) : null}
		</>
	)
}
