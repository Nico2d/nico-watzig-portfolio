import { ContactIcons } from '@/components/ContactIcons'
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
	const res = useWindowSize()

	return (
		<>
			{isLandingUnlock ? <Header /> : null}

			<div className="parallax-container h-screen lg:flex lg:flex-row bg-landingLockRightBackground">
				{res.width > 1024 ? (
					<div className="relative lg:w-[350px] h-1/4 lg:h-full left-section z-10">
						<WelcomeText className="max-lg:hidden" />
					</div>
				) : null}

				<ParallaxFace isLocked={isLandingUnlock} />

				{res.width < 1024 ? (
					<div className="bottom-section text-white pt-28 pl-6">
						<p className="text-base">Hi, I am</p>
						<p className="text-3xl font-bold">Nico Wätzig</p>
						<p className="text-xs font-extrabold tracking-widest">
							Frontend Developer
						</p>

						<ContactIcons className="absolute top-1/2 -translate-y-1/3 right-5 flex-col" />
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

			{isLandingUnlock ? (
				<div className="absolute top-1/2 -translate-y-1/2 left-[100px] z-40">
					<WelcomeSection />
				</div>
			) : null}
		</>
	)
}
