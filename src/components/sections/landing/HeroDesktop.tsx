import { Header } from "@/components/header/Header"
import { DiscoverButton } from "@/components/ui/DiscoverButton"
import { MobileLandingInfo } from "./MobileLandingInfo"
import { ParallaxHero } from "./ParallaxHero/ParallaxHero"
import { WelcomeSection } from "./WelcomeSection"
import { WelcomeText } from "./WelcomeText"

export const HeroDesktop = () => {
	// return (
	// 	<>
	// 		{!isLandingUnlock ? null : <Header />}

	// 		<div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden lg:flex lg:flex-row bg-landing-lock-right-bg">
	// 			{isDesktop ? (
	// 				<div className="relative lg:w-[350px] h-1/4 lg:h-full left-section z-10">
	// 					<WelcomeText className="max-lg:hidden" />
	// 				</div>
	// 			) : null}

	// 			<ParallaxHero isLocked={isDesktop && isLandingUnlock} />

	// 			<MobileLandingInfo />
	// 		</div>

	// 		<div className="h-screen"></div>

	// 		{isDesktop && (
	// 			<>
	// 				<DiscoverButton
	// 					size={80}
	// 					onClick={() => {
	// 						setIsLandingUnlock(!isLandingUnlock)
	// 					}}
	// 					isLandingUnlock={isLandingUnlock}
	// 				/>

	// 				{isLandingUnlock && (
	// 					<div className="absolute top-1/2 -translate-y-1/2 left-[100px] z-40">
	// 						<WelcomeSection />
	// 					</div>
	// 				)}
	// 			</>
	// 		)}
	// 	</>
	// )
}
