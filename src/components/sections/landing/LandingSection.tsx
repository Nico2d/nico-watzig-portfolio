import { Header } from '@/components/header'
import { ParallaxFace } from '@/components/sections/landing/ParallaxFace'
import { WelcomeSection } from '@/components/sections/landing/WelcomeSection'
import { WelcomeText } from '@/components/sections/landing/WelcomeText'
import { ContactIcons } from '@/components/ui/ContactIcons'
import { DiscoverButton } from '@/components/ui/DiscoverButton'
import { useWindowSize } from '@/hooks/useWindowSize'

export default function LandingSection({
	isLandingUnlock,
	setIsLandingUnlock,
}) {
	const res = useWindowSize()
	const isMobileResolution = res.width < 1024

	return (
		<>
			{isLandingUnlock && !isMobileResolution ? <Header /> : null}

			<div className="parallax-container h-screen lg:flex lg:flex-row bg-landingLockRightBackground">
				{!isMobileResolution ? (
					<div className="relative lg:w-[350px] h-1/4 lg:h-full left-section z-10">
						<WelcomeText className="max-lg:hidden" />
					</div>
				) : null}

				<ParallaxFace
					isLocked={isLandingUnlock && !isMobileResolution}
				/>

				{isMobileResolution ? (
					<div className="bottom-section flex justify-between container-md items-center">
						<div className="mt-[6vh]">
							<p className="text-base">Hi, I am</p>
							<p className="text-3xl font-bold">Nico Wätzig</p>
							<p className="text-xs font-extrabold tracking-widest">
								Frontend Developer
							</p>
						</div>

						<ContactIcons className="flex-col" />
					</div>
				) : null}
			</div>

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
