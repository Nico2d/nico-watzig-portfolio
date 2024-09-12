import { useWindowSize } from '@/hooks/useWindowSize'
import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'

export const DiscoverButton = ({ size = 80, onClick, isLandingUnlock }) => {
	const OFFSET = 100

	const resolution = useWindowSize()
	const controls = useAnimation()
	const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)
	const [
		animationInterval,
		setAnimationInterval,
	] = useState<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (isLandingUnlock) {
			if (animationInterval) {
				clearInterval(animationInterval)
			}
		} else {
			setAnimationInterval(
				setInterval(() => {
					controls.start({
						scale: [1, 2, 2, 1, 1],
						rotate: [0, 0, 180, 180, 0],
						borderRadius: ['0%', '0%', '50%', '50%', '0%'],
					})
				}, 7000)
			)
		}

		return () => {
			if (animationInterval) {
				clearInterval(animationInterval)
			}
		}
	}, [isLandingUnlock])

	return (
		<div className="max-lg:hidden">
			<motion.div
				onClick={isLandingUnlock ? onClick : null}
				className={`
					absolute h-[${size}px] z-20 bg-landingUnlockPrimary cursor-pointer ${
					!isLandingUnlock && isAnimationPlaying
						? 'invisible'
						: 'visible'
				}`}
				animate={isLandingUnlock ? 'extended' : 'normal'}
				variants={{
					normal: {
						bottom: `${OFFSET}px`,
						left: `${OFFSET}px`,
						top: `${resolution.height - OFFSET - size}px`,
						right: `${resolution.width - OFFSET - size}px`,
					},
					extended: {
						bottom: '0px',
						left: '0px',
						top: '0px',
						right: '0px',
					},
				}}
			></motion.div>

			<motion.div
				onClick={onClick}
				className={`absolute size-[80px] z-30 ${
					isLandingUnlock ? 'bg-primary' : 'bg-landingUnlockPrimary'
				} cursor-pointer left-[100px] bottom-[100px]`}
				animate={controls}
				transition={{
					duration: 2,
					ease: 'easeInOut',
					times: [0, 0.2, 0.5, 0.8, 1],
				}}
				onAnimationStart={() => {
					setIsAnimationPlaying(true)
				}}
				onAnimationComplete={() => {
					setIsAnimationPlaying(false)
				}}
			></motion.div>

			<motion.button
				onClick={onClick}
				className={`absolute pl-[30px] z-30 text-2xl whitespace-nowrap h-[${size}px] bottom-[120px] left-[100px] right`}
				variants={{
					normal: {
						bottom: '0px',
						left: '0px',
					},
					extended: {
						bottom: `${OFFSET}px`,
						left: `${OFFSET}px`,
					},
				}}
			>
				{isLandingUnlock ? 'I changed my mind' : 'Give a chance'}
			</motion.button>
		</div>
	)
}
