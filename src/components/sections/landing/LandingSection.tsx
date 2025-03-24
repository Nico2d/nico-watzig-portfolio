import { Header } from '@/components/header/Header'
import { ParallaxHero } from '@/components/sections/landing/ParallaxHero/ParallaxHero'
import { IntroductionSection } from '@/components/sections/landing/IntroductionSection'
import { HelloTextAnimation } from '@/components/sections/landing/WelcomeText'
import { DiscoverButton } from '@/components/ui/DiscoverButton'
import { useWindowSize } from '@/hooks/useWindowSize'
import { MobileLandingInfo } from './MobileLandingInfo'

export default function LandingSection({
	isLandingUnlock,
	setIsLandingUnlock,
}) {
	const { isDesktop } = useWindowSize()

	return (
		<>
			<Header isHidden={isDesktop && !isLandingUnlock} />

			<div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden lg:flex lg:flex-row bg-landing-lock-right-bg">
				{isDesktop && (
					<div className="relative lg:w-[350px] h-1/4 lg:h-full left-section z-10">
						<HelloTextAnimation />
					</div>
				)}

				<ParallaxHero isLocked={isDesktop && isLandingUnlock} />

				<MobileLandingInfo />
			</div>

			<div className="h-screen"></div>

			<DiscoverButton
				onClick={() => {
					setIsLandingUnlock(!isLandingUnlock)
				}}
				isLandingUnlock={isLandingUnlock}
			/>

			{isLandingUnlock && isDesktop && (
				<div className="absolute top-1/2 -translate-y-1/2 left-[100px] z-40">
					<IntroductionSection />
				</div>
			)}
		</>
	)
}
