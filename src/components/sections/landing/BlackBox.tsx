import { useParallaxHero } from '@/stores/parallaxHero/useParallaxHero'
import { motion, useAnimation, Variants } from 'motion/react'
import { useState, useEffect, useRef } from 'react'

interface BlackBoxProps {
	boundingClientRect: DOMRect
}

export const BlackBox = ({ boundingClientRect }: BlackBoxProps) => {
	const {
		isLandingUnlock,
		saveIsLandingUnlock,
		landingUnlock,
	} = useParallaxHero()

	const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)
	const controls = useAnimation()

	useEffect(() => {
		const unlockLanding = async () => {
			if (intervalRef.current) clearInterval(intervalRef.current)

			if (isAnimationPlaying) {
				controls.stop()
			}

			await controls.start({
				left: boundingClientRect.left,
				transition: {
					duration: 0,
					ease: 'linear',
				},
			})

			await controls.start('fullscreen')
		}

		const lockLanding = async () => {
			await controls.start('default')

			intervalRef.current = setInterval(() => {
				controls.start('animation')
			}, 7000)
		}

		if (isLandingUnlock) {
			unlockLanding()
		} else {
			lockLanding()
		}

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current)
		}
	}, [isLandingUnlock])

	console.log('[BlackBox] isLandingUnlock', isLandingUnlock)

	const boxVariants: Variants = {
		default: {
			bottom: boundingClientRect.bottom,
			width: boundingClientRect.width,
			height: boundingClientRect.height,
		},
		fullscreen: {
			bottom: 0,
			left: 0,
			width: '100vw',
			height: '100vh',
			scale: 1,
			rotate: 0,
			borderRadius: '0%',
			transition: {
				ease: 'easeInOut',
				duration: 0.4,
			},
		},
		animation: {
			scale: [1, 1.5, 1.5, 1.2, 1],
			rotate: [0, 0, 180, 180, 0],
			borderRadius: ['0%', '0%', '50%', '50%', '0%'],
			transition: {
				duration: 2,
				ease: 'easeInOut',
				times: [0, 0.2, 0.5, 0.8, 1],
			},
		},
	}

	return (
		<motion.div
			className={`bg-landing-unlock-primary ${
				isLandingUnlock ? '' : 'cursor-pointer'
			} absolute z-[10]`}
			variants={boxVariants}
			animate={controls}
			initial={'default'}
			onAnimationStart={() => {
				setIsAnimationPlaying(true)
			}}
			onAnimationComplete={() => {
				setIsAnimationPlaying(false)
			}}
			onClick={() => {
				// !isLandingUnlock && saveIsLandingUnlock(true)
				landingUnlock()
			}}
		/>
	)
}
