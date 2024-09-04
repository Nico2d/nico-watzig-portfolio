import { useState, useEffect } from 'react'
import face1 from '../../assets/face/LandingFace-part1.png'
import face2 from '../../assets/face/LandingFace-part2.png'
import face3 from '../../assets/face/LandingFace-part3.png'
import { ParallaxLayer } from '../components/ParallaxLayer'

export const ParallaxFace = ({ isLocked = false }) => {
	const FOCUS_POINT_OFFSET = 140

	const [focusPoint, setFocusPoint] = useState([0, 0])

	useEffect(() => {
		setFocusPoint([
			FOCUS_POINT_OFFSET,
			window.innerHeight - FOCUS_POINT_OFFSET,
		])
	}, [])

	return (
		<div
			className={`${
				isLocked ? '' : 'right-section'
			}  relative lg:w-3/4 h-3/4 lg:h-full`}
		>
			<ParallaxLayer speed={5} focusPoint={focusPoint} isLock={isLocked}>
				<img
					src={face1.src}
					alt="Layer 1"
					className={`aspect-square ${isLocked ? 'z-20' : 'z-0'}`}
				/>
			</ParallaxLayer>
			<ParallaxLayer
				speed={-60}
				focusPoint={focusPoint}
				isLock={isLocked}
			>
				<img
					src={face2.src}
					alt="Layer 2"
					className={`aspect-square ${isLocked ? 'z-20' : 'z-0'}`}
				/>
			</ParallaxLayer>
			<ParallaxLayer speed={40} focusPoint={focusPoint} isLock={isLocked}>
				<img
					src={face3.src}
					alt="Layer 3"
					className={`aspect-square ${isLocked ? 'z-20' : 'z-0'}`}
				/>
			</ParallaxLayer>
		</div>
	)
}
