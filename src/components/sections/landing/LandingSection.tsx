import { ParallaxHero } from '@/components/sections/landing/ParallaxHero/ParallaxHero'
import { IntroductionSection } from '@/components/sections/landing/IntroductionSection'
import { HelloTextAnimation } from '@/components/sections/landing/HelloTextAnimation'
import { useWindowSize } from '@/hooks/useWindowSize'
import { MobileLandingInfo } from './MobileLandingInfo'
import { useParallaxHero } from '@/stores/parallaxHero/useParallaxHero'
import { DiscoveryButtonPortal } from '@/components/ui/DiscoveryButtonPortal'

export default function LandingSection() {
	const { isDesktop } = useWindowSize()
	const { isLandingUnlock } = useParallaxHero()

	return (
		<>
			{isDesktop ? (
				<>
					{/* DESKTOP */}
					<div className="h-screen"></div>
					{/* WHY? h-screen make space of screen and absolte perfect mach h-screen on mobile devices insted of 100vhh :/ */}
					<div
						id="discovery-root"
						className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden bg-landing-lock-right-bg"
					>
						<div className="absolute left-0 top-0 right-1/2 bottom-0 bg-landing-lock-left-bg left-section left-side-polygon z-[1]" />
						<div className="relative container mx-auto px-4 h-screen z-10">
							<HelloTextAnimation />

							<DiscoveryButtonPortal />
						</div>

						<div
							className="absolute left-0 right-0 top-0 bottom-0 translate-x-[25%]"
							style={{
								zIndex: isLandingUnlock ? 21 : 0,
							}}
						>
							<ParallaxHero isLocked={isLandingUnlock} />
						</div>
					</div>

					{isLandingUnlock && (
						<div className="container mx-auto px-4">
							<div className="absolute top-1/2 -translate-y-1/2 z-40">
								<IntroductionSection />
							</div>
						</div>
					)}
				</>
			) : (
				<>
					{/* MOBILE */}
					<div className="h-screen"></div>
					{/* WHY? h-screen make space of screen and absolte perfect mach h-screen on mobile devices insted of 100vhh :/ */}
					<div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden bg-landing-lock-right-bg">
						<ParallaxHero isLocked={false} />
						<MobileLandingInfo />
					</div>
				</>
			)}
		</>
	)
}
