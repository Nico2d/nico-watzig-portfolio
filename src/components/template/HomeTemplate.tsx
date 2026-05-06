import { AboutSection, TechnologiesSection } from '../sections'
import dynamic from 'next/dynamic'
import { useParallaxHero } from '@/stores/parallaxHero/useParallaxHero'
import { Header } from '../header/Header'
import { PageBackdrop } from './PageBackdrop'
import { Footer } from '../footer/Footer'

const DynamicLandingSection = dynamic(
	() => import('@/components/sections/landing/LandingSection'),
	{
		ssr: false,
	}
)

export const HomeTemplate = () => {
	const { isLandingUnlock } = useParallaxHero()

	const sectionsHidden =
		isLandingUnlock === undefined ? false : !isLandingUnlock

	return (
		<>
			<Header isHidden={!isLandingUnlock} />

			<DynamicLandingSection />

			<div
				className={`relative isolate overflow-hidden ${
					sectionsHidden ? 'lg:hidden' : 'lg:block'
				}`}
			>
				<PageBackdrop />
				<div className="container mx-auto px-4 space-y-8">
					<AboutSection />
					<TechnologiesSection />
				</div>
			</div>

			<Footer isHidden={sectionsHidden} />
		</>
	)
}
