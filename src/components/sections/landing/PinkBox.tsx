import { useParallaxHero } from '@/stores/parallaxHero/useParallaxHero'
import { motion, useAnimation, Variants } from 'motion/react'
import { useEffect, useState } from 'react'

interface IPinkBoxProps {
	boundingClientRect: DOMRect
}

export const PinkBox = ({ boundingClientRect }: IPinkBoxProps) => {
	const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)
	const {
		isLandingUnlock,
		isInContainer,
		landingLock,
		controls,
	} = useParallaxHero()
	// const controls = useAnimation()

	const boxVariants: Variants = {
		default: {
			bottom: boundingClientRect.bottom,
			left: boundingClientRect.left,
			width: 0,
			height: 0,
			scale: 0,
		},
		fullscreen: {
			bottom: boundingClientRect.bottom,
			left: boundingClientRect.left,
			width: 30,
			height: 30,
			scale: 1,
		},
	}

	// useEffect(() => {
	// 	const runAnimation = async () => {
	// 		if (isLandingUnlock) {
	// 			await controls.start('fullscreen')
	// 		} else {
	// 			await controls.start('default')
	// 		}
	// 	}

	// 	runAnimation()
	// }, [isLandingUnlock])

	// const handleClick = async () => {
	// 	console.log("clicked")
	// 	// // console.timeLog('clicked')
	// 	// await controls.start('default')
	// 	// // console.timeLog('clicked 2')
	// 	// saveIsLandingUnlock(false)

	// 	// controls.

	// 	landingLock()
	// }

	console.log('isInContainer ', isInContainer)
	console.log('control: ', controls)

	return (
		<motion.div
			className={`bg-primary cursor-pointer absolute z-[12] bottom-[100px]`}
			initial={'fullscreen'}
			// animate={controls}
			variants={boxVariants}
			animate={isInContainer ? 'fullscreen' : 'default'}
			// whileHover={{
			// 	scale: 2,
			// 	transition: { duration: 0.3 },
			// }}
			// onClick={handleClick}
		/>
	)
}
