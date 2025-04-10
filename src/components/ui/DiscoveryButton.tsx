import { useParallaxFocus } from '@/hooks/useParallaxFocus'
import { BlackBox } from '../sections/landing/BlackBox'
import { useParallaxHero } from '@/stores/parallaxHero/useParallaxHero'
import { motion } from 'motion/react'

export const DiscoveryButton = () => {
	const { boundingClientRect } = useParallaxFocus()
	const { landingUnlock } = useParallaxHero()

	if (!boundingClientRect) return null

	return (
		<>
			<BlackBox boundingClientRect={boundingClientRect} />
			<motion.div
				className={`absolute text-2xl whitespace-nowrap bottom-[100px] z-[30] cursor-pointer`}
				style={{
					left: 0,
					padding: 16,
					marginLeft: 16,
				}}
				animate={'default'}
				onClick={landingUnlock}
			>
				Give a chance
			</motion.div>
		</>
	)
}
