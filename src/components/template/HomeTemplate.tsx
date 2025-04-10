import { AboutSection, TechnologiesSection } from '../sections'
import dynamic from 'next/dynamic'
import { useParallaxHero } from '@/stores/parallaxHero/useParallaxHero'
import { Header } from '../header/Header'

const DynamicLandingSection = dynamic(
	() => import('@/components/sections/landing/LandingSection'),
	{
		ssr: false,
	}
)

export const HomeTemplate = () => {
	const { isLandingUnlock } = useParallaxHero()

	if (isLandingUnlock === undefined) {
		return (
			<>
				<Header isHidden={!isLandingUnlock} />

				<DynamicLandingSection />
				<div className={`container mx-auto px-4 space-y-8`}>
					<AboutSection />
					<TechnologiesSection />
				</div>
			</>
		)
	}

	return (
		<>
			<Header isHidden={!isLandingUnlock} />

			<DynamicLandingSection />
			<div
				className={`container mx-auto px-4 space-y-8 lg:${
					isLandingUnlock ? 'block' : 'hidden'
				}`}
			>
				<AboutSection />
				<TechnologiesSection />
			</div>
		</>
	)
}
