import { useEffect, useState } from 'react'
import { useWindowSize } from './useWindowSize'

export const useParallaxFocus = (size = 50, bottomOffset = 100) => {
	const { resolution } = useWindowSize()
	const [boundingClientRect, setBoundingClientRect] = useState<DOMRect>()

	useEffect(() => {
		if (!resolution) return

		const leftPosition = getLeftPosition(resolution)

		const boundingClientRect: DOMRect = {
			width: size,
			height: size,
			left: leftPosition,
			bottom: bottomOffset,
			right: resolution.width - leftPosition - size,
			top: resolution.height - bottomOffset - size,
			x: leftPosition,
			y: resolution.height - bottomOffset - size,
			toJSON: () => {},
		}

		setBoundingClientRect(boundingClientRect)
	}, [resolution])

	function getContainerWidth(resolution) {
		if (resolution >= 1536) return 1536
		if (resolution >= 1280) return 1280
		if (resolution >= 1024) return 1024
		if (resolution >= 768) return 768
		if (resolution >= 640) return 640
		return resolution
	}

	const getLeftPosition = (resolution) => {
		const padding = 16
		const marginWidth =
			resolution.width - getContainerWidth(resolution.width)

		return marginWidth / 2 + padding
	}

	const getVertices = () => {
		if (!boundingClientRect) return []

		return [
			[
				boundingClientRect.left,
				window.innerHeight - boundingClientRect.bottom,
			],
			[
				boundingClientRect.left + size,
				window.innerHeight - boundingClientRect.bottom,
			],
			[
				boundingClientRect.left + size,
				window.innerHeight - (boundingClientRect.bottom + size),
			],
			[
				boundingClientRect.left,
				window.innerHeight - (boundingClientRect.bottom + size),
			],
		]

		// return [
		// 	[boundingClientRect.left, boundingClientRect.bottom],
		// 	[boundingClientRect.right, boundingClientRect.bottom],
		// 	[boundingClientRect.right, boundingClientRect.top],
		// 	[boundingClientRect.left, boundingClientRect.top],
		// ]
	}

	return { boundingClientRect, getVertices }
}
