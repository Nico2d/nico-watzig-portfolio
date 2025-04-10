import { useParallaxFocus } from '@/hooks/useParallaxFocus'
import { BlackBox } from '../sections/landing/BlackBox'
import { useParallaxHero } from '@/stores/parallaxHero/useParallaxHero'
import { PinkBox } from '../sections/landing/PinkBox'
import { motion } from 'motion/react'

export const DiscoveryButton = () => {
	const { boundingClientRect } = useParallaxFocus()
	const { isLandingUnlock } = useParallaxHero()

	if (!boundingClientRect) return null

	return (
		<>
			<BlackBox boundingClientRect={boundingClientRect} />
			{/* <PinkBox boundingClientRect={boundingClientRect} /> */}
			<motion.div
				className={`absolute text-2xl whitespace-nowrap bottom-[100px] z-[30] pointer-events-none`}
				style={{
					left: isLandingUnlock ? boundingClientRect.left : 0,
					padding: isLandingUnlock ? 0 : 16,
					marginLeft: isLandingUnlock ? 8 : 16,
				}}
				animate={isLandingUnlock ? 'fullscreen' : 'default'}
			>
				{isLandingUnlock ? 'I changed my mind' : 'Give a chance'}
			</motion.div>
		</>
	)
}
