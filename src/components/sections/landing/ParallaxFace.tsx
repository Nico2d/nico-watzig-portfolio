import { useState, useEffect } from 'react'
import face1 from '@images/face/LandingFace-part1.png'
import face2 from '@images/face/LandingFace-part2.png'
import face3 from '@images/face/LandingFace-part3.png'
import { ParallaxLayer } from './ParallaxLayer'
import { useWindowSize } from '@/hooks/useWindowSize'
import { distanceFromFocusArea } from '@/utils/countDistance'
import { DistanceType } from '@/types/types'
import Image from 'next/image'

export const ParallaxFace = ({ isLocked = false }) => {
	const BREAK_POINT = 1024
	const FOCUS_POINT_OFFSET = 100
	const FOCUS_AREA = 80

	const [distance, setDistance] = useState<DistanceType>({
		distance: 0,
		distanceX: 0,
		distanceY: 0,
	})
	const resolution = useWindowSize()

	const [focusArea, setFocusArea] = useState([
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	])

	useEffect(() => {
		setFocusArea([
			[FOCUS_POINT_OFFSET, window.innerHeight - FOCUS_POINT_OFFSET],
			[
				FOCUS_POINT_OFFSET + FOCUS_AREA,
				window.innerHeight - FOCUS_POINT_OFFSET,
			],
			[
				FOCUS_POINT_OFFSET + FOCUS_AREA,
				window.innerHeight - (FOCUS_POINT_OFFSET + FOCUS_AREA),
			],
			[
				FOCUS_POINT_OFFSET,
				window.innerHeight - (FOCUS_POINT_OFFSET + FOCUS_AREA),
			],
		])
	}, [])

	useEffect(() => {
		const handleMouseMove = (e) => {
			const { pageX, pageY } = e

			const distance = distanceFromFocusArea(focusArea, [pageX, pageY])
			setDistance(distance)
		}

		const subscribeMovement = () => {
			window.addEventListener('mousemove', handleMouseMove)
		}

		const unsubscribeMovement = () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}

		if (isLocked) {
			setDistance({
				distance: 0,
				distanceX: 0,
				distanceY: 0,
			})
		} else {
			subscribeMovement()
		}

		return () => {
			unsubscribeMovement()
		}
	}, [focusArea, isLocked])

	const getTransform = (speed: number) => {
		const x = (distance.distanceX * speed) / 100
		const y = (distance.distanceY * speed) / 100
		const scale = 1 + Math.abs((distance.distance * speed) / 10000)

		return `translateX(${x}px) translateY(${y}px) scale(${scale})`
	}

	return (
		<div
			className={`${
				isLocked ? 'z-30' : 'right-section z-0'
			} relative lg:w-3/4 h-3/4 lg:h-full`}
		>
			<ParallaxLayer
				transform={
					resolution.width < BREAK_POINT ? '' : getTransform(5)
				}
			>
				<Image
					className={`aspect-square`}
					src={face1.src}
					alt="Layer 1"
					width={1350}
					height={1350}
				/>
			</ParallaxLayer>
			<ParallaxLayer
				transform={
					resolution.width < BREAK_POINT ? '' : getTransform(-60)
				}
			>
				<Image
					className={`aspect-square`}
					src={face2.src}
					alt="Layer 2"
					width={1350}
					height={1350}
				/>
			</ParallaxLayer>
			<ParallaxLayer
				transform={
					resolution.width < BREAK_POINT ? '' : getTransform(40)
				}
			>
				<Image
					className={`aspect-square`}
					src={face3.src}
					alt="Layer 3"
					width={1350}
					height={1350}
				/>
			</ParallaxLayer>
		</div>
	)
}
