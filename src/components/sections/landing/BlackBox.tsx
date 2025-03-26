import { motion, useAnimation, Variants } from 'motion/react'
import { useState, useEffect } from 'react'

interface BlackBoxProps {
	isLandingUnlock: boolean
	onClick: () => void
	boundingClientRect: DOMRect
}

export const BlackBox = ({
	isLandingUnlock,
	onClick,
	boundingClientRect,
}: BlackBoxProps) => {
	const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)
	const [
		animationInterval,
		setAnimationInterval,
	] = useState<NodeJS.Timeout | null>(null)
	const controls = useAnimation()

	useEffect(() => {
		if (isLandingUnlock) {
			if (animationInterval) {
				clearInterval(animationInterval)
			}
			if (isAnimationPlaying) {
				controls.stop()
			}

			controls.start('fullscreen')
		} else {
			controls.start('default')

			setAnimationInterval(
				setInterval(() => {
					controls.start('animation')
				}, 7000)
			)
		}
		return () => {
			if (animationInterval) {
				clearInterval(animationInterval)
			}
		}
	}, [isLandingUnlock])

	const boxVariants: Variants = {
		default: {
			bottom: boundingClientRect.bottom,
			left: boundingClientRect.left,
			top: boundingClientRect.top,
			right: boundingClientRect.right,
		},
		fullscreen: {
			bottom: 0,
			left: 0,
			top: 0,
			right: 0,
			scale: 1,
			rotate: 0,
			borderRadius: '0%',
		},
		animation: {
			scale: [1, 2, 2, 1, 1],
			rotate: [0, 0, 180, 180, 0],
			borderRadius: ['0%', '0%', '50%', '50%', '0%'],
			transition: {
				duration: 2,
				ease: 'easeInOut',
				times: [0, 0.2, 0.5, 0.8, 1],
			},
		},
	}

	console.log('isLandingUnlock: ', isLandingUnlock, boundingClientRect)

	return (
		<motion.div
			className={`bg-landing-unlock-primary cursor-pointer absolute z-20`}
			variants={boxVariants}
			animate={controls}
			initial={isLandingUnlock ? 'fullscreen' : 'default'}
			onAnimationStart={() => {
				setIsAnimationPlaying(true)
			}}
			onAnimationComplete={() => {
				setIsAnimationPlaying(false)
			}}
			onClick={onClick}
		/>
	)
}
