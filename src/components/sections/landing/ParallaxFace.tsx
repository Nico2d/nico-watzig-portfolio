import { useState, useEffect } from 'react'
import face1 from '@images/face/LandingFace-part1.png'
import face2 from '@images/face/LandingFace-part2.png'
import face3 from '@images/face/LandingFace-part3.png'
import { ParallaxLayer } from './ParallaxLayer'
import { useWindowSize } from '@/hooks/useWindowSize'

export const ParallaxFace = ({ isLocked = false }) => {
	const FOCUS_POINT_OFFSET = 140
	const BREAK_POINT = 1024

	const [focusPoint, setFocusPoint] = useState([0, 0])
	const resolution = useWindowSize()

	// TODO: add focusArea instead of focusPoint
	// const [focusArea, setFocusArea] = useState([
	// 	[0, 0],
	// 	[0, 10],
	// 	[10, 0],
	// 	[10, 10],
	// ])

	useEffect(() => {
		setFocusPoint([
			FOCUS_POINT_OFFSET,
			window.innerHeight - FOCUS_POINT_OFFSET,
		])
	}, [])

	return (
		<div
			className={`${
				isLocked ? 'z-30' : 'right-section z-0'
			} relative lg:w-3/4 h-3/4 lg:h-full`}
		>
			<ParallaxLayer
				speed={5}
				focusPoint={focusPoint}
				isLock={isLocked || resolution.width < BREAK_POINT}
			>
				<img
					src={face1.src}
					alt="Layer 1"
					className={`aspect-square`}
				/>
			</ParallaxLayer>
			<ParallaxLayer
				speed={-60}
				focusPoint={focusPoint}
				isLock={isLocked || resolution.width < BREAK_POINT}
			>
				<img
					src={face2.src}
					alt="Layer 2"
					className={`aspect-square`}
				/>
			</ParallaxLayer>
			<ParallaxLayer
				speed={40}
				focusPoint={focusPoint}
				isLock={isLocked || resolution.width < BREAK_POINT}
			>
				<img
					src={face3.src}
					alt="Layer 3"
					className={`aspect-square`}
				/>
			</ParallaxLayer>
		</div>
	)
}
