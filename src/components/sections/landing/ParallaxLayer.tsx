import { useRef, useEffect } from 'react'

export const ParallaxLayer = ({
	speed,
	focusPoint,
	children,
	isLock = false,
}) => {
	const layerRef = useRef(null)

	const handleMouseMove = (e) => {
		const { pageX, pageY } = e

		const offsetX = pageX - focusPoint[0]
		const offsetY = pageY - focusPoint[1]

		const x = (offsetX * speed) / 100
		const y = (offsetY * speed) / 100

		const distance = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2))
		const scale = Math.abs((distance * speed) / 10000)

		if (layerRef.current) {
			layerRef.current.style.transform = `translateX(${x}px) translateY(${y}px) scale(${
				1 + scale
			})`
		}
	}

	useEffect(() => {
		if (isLock) {
			layerRef.current.style.transform = `translateX(0px) translateY(0px) scale(1)`
		} else {
			window.addEventListener('mousemove', handleMouseMove)
			return () => {
				window.removeEventListener('mousemove', handleMouseMove)
			}
		}
	}, [focusPoint, isLock])

	return (
		<div ref={layerRef} className="parallax-layer">
			{children}
		</div>
	)
}
