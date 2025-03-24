import { useWindowSize } from '@/hooks/useWindowSize'
import { useAnimation, motion } from 'motion/react'
import { useState, useEffect } from 'react'

export const DiscoverButton = ({ onClick, isLandingUnlock }) => {
	const OFFSET = 100

	const { resolution, isMobile } = useWindowSize()
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

			return
		}

		setAnimationInterval(
			setInterval(() => {
				controls.start({
					scale: [1, 2, 2, 1, 1],
					rotate: [0, 0, 180, 180, 0],
					borderRadius: ['0%', '0%', '50%', '50%', '0%'],
				})
			}, 7000)
		)

		return () => {
			if (animationInterval) {
				clearInterval(animationInterval)
			}
		}
	}, [isLandingUnlock])

	if (isMobile) return null

	return (
		<div id="discovery-container" className="max-lg:hidden">
			<motion.div
				id="button-action-discovery-3"
				onClick={isLandingUnlock ? onClick : null}
				className={`absolute z-20 bg-landing-unlock-primary cursor-pointer ${
					!isLandingUnlock && isAnimationPlaying
						? 'invisible'
						: 'visible'
				}`}
				initial={isLandingUnlock ? 'unlocked' : 'locked'}
				animate={isLandingUnlock ? 'unlocked' : 'locked'}
				variants={{
					locked: {
						bottom: `${OFFSET}px`,
						left: `${OFFSET}px`,
						top: `${resolution.height - OFFSET - 80}px`,
						right: `${resolution.width - OFFSET - 80}px`,
					},
					unlocked: {
						bottom: '0px',
						left: '0px',
						top: '0px',
						right: '0px',
					},
				}}
			/>

			<motion.div
				id="button-action-discovery-2"
				onClick={onClick}
				className={`absolute size-[80px] z-30 ${
					isLandingUnlock ? 'bg-primary' : 'bg-landing-unlock-primary'
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
			/>

			<motion.button
				id="button-action-discovery-1"
				onClick={onClick}
				className={`absolute pl-[30px] z-30 text-2xl whitespace-nowrap h-[80px] bottom-[80px] left-[100px] right`}
				variants={{
					locked: {
						bottom: '0px',
						left: '0px',
					},
					unlocked: {
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
