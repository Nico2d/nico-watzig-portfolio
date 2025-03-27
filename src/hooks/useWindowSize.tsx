'use client'

import { useEffect, useState } from 'react'

type resolutionType = {
	width: number
	height: number
}

export const useWindowSize = () => {
	const [resolution, setResolution] = useState<resolutionType>()

	useEffect(() => {
		function handleResize() {
			setResolution({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		window.addEventListener('resize', handleResize)

		handleResize()

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return {
		resolution,
		isMobile: resolution ? resolution.width < 1024 : false,
		isDesktop: resolution ? resolution.width >= 1024 : false,
	}
}
