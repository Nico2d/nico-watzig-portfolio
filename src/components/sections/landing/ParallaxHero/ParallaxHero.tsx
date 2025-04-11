import { useState, useEffect } from 'react'
import face1 from '@images/face/LandingFace-part1.webp'
import face2 from '@images/face/LandingFace-part2.webp'
import face3 from '@images/face/LandingFace-part3.webp'
import { DistanceType } from '@/types/types'
import Image from 'next/image'
import { ParallaxLayer } from './ParallaxLayer'
import { useParallaxFocus } from '@/hooks/useParallaxFocus'
import { useCountDistance } from '@/hooks/useCountDistance'

export const ParallaxHero = ({ isLocked = false }) => {
	const { boundingClientRect, getVertices } = useParallaxFocus()
	const { distanceFromFocusArea } = useCountDistance()

	const [distance, setDistance] = useState<DistanceType>({
		distance: 0,
		distanceX: 0,
		distanceY: 0,
	})
	const [isAnimating, setIsAnimating] = useState(false)

	const [isParallaxBlocked, setIsParallaxBlocked] = useState(false)

	const handleParallax = (x: number, y: number) => {
		const distance = distanceFromFocusArea(getVertices(), [x, y])
		setDistance(distance)
	}

	useEffect(() => {
		const handleMouseMove = (e) => {
			const { pageX, pageY } = e

			handleParallax(pageX, pageY)
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
	}, [boundingClientRect, isLocked])

	const getTransform = (speed: number) => {
		const x = (distance.distanceX * speed) / 100
		const y = (distance.distanceY * speed) / 100
		const scale = 1 + Math.abs((distance.distance * speed) / 10000)

		return `translateX(${x}px) translateY(${y}px) scale(${scale})`
	}

	const PARALLAX_IMAGES = [
		{
			image: {
				src: face1.src,
				alt: 'layer 1',
			},
			offset: 5,
		},
		{
			image: {
				src: face2.src,
				alt: 'layer 2',
			},
			offset: -60,
		},
		{
			image: {
				src: face3.src,
				alt: 'layer 3',
			},
			offset: 40,
		},
	]

	return (
		<div
			className={`${
				isLocked ? 'z-30' : 'right-section z-0'
			} relative lg:w-3/4 h-3/4 lg:h-full transition-transform`}
			onTouchMove={(e) => {
				setIsAnimating(false)
				setIsParallaxBlocked(false)

				const [x, y] = [e.touches[0].clientX, e.touches[0].clientY]

				handleParallax(x, y)
			}}
			onTouchEnd={(e) => {
				setIsAnimating(true)
				setIsParallaxBlocked(true)
			}}
			style={{ touchAction: 'none' }}
		>
			{PARALLAX_IMAGES.map((parallaxItem, idx) => {
				const transform = isParallaxBlocked
					? ''
					: getTransform(parallaxItem.offset)

				return (
					<ParallaxLayer
						key={idx}
						transform={transform}
						isAnimating={isAnimating}
					>
						<Image
							className={`parallax-image`}
							priority={true}
							src={parallaxItem.image.src}
							alt={parallaxItem.image.alt}
							width={1350}
							height={1350}
						/>
					</ParallaxLayer>
				)
			})}
		</div>
	)
}
