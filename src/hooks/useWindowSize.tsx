import { useEffect, useState } from 'react'

type resolutionType = {
	width: number
	height: number
}

export const useWindowSize = () => {
	const [resolution, setResolution] = useState<resolutionType>({
		width: 0,
		height: 0,
	})

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

	return resolution
}
