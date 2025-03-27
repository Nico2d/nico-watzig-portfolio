import { motion, useAnimation, Variants } from 'motion/react'
import { useState, useEffect, useRef } from 'react'

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
	const boxRef = useRef<HTMLDivElement>(null)
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

	useEffect(() => {
		if (!isLandingUnlock) {
			controls.start({
				left: boundingClientRect.left,
				transition: {
					duration: 0,
					ease: 'linear',
				},
			})
		}
	}, [boundingClientRect.left])

	const boxVariants: Variants = {
		default: {
			bottom: boundingClientRect.bottom,
			left: boundingClientRect.left,
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

	return (
		<motion.div
			ref={boxRef}
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
