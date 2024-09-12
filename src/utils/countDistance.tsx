import { DistanceType } from '@/types/types'

export const distanceFromFocusArea = (
	focusArea: number[][],
	currentPoint: [number, number]
): DistanceType => {
	if (isPointInFocusArea(focusArea, currentPoint)) {
		return {
			distance: 0,
			distanceX: 0,
			distanceY: 0,
		}
	}

	let minDistance = {
		distance: Infinity,
		distanceX: 0,
		distanceY: 0,
	}

	for (let i = 0; i < focusArea.length; i++) {
		const lineStart = focusArea[i] as [number, number]
		const lineEnd = focusArea[(i + 1) % focusArea.length] as [
			number,
			number
		]
		const distance = calculateDistanceToLine(
			currentPoint,
			lineStart,
			lineEnd
		)

		if (distance.distance < minDistance.distance) {
			minDistance = distance
		}
	}

	return minDistance
}

const isPointInFocusArea = (
	focusArea: number[][],
	point: number[]
): boolean => {
	let prevCrossProduct: null | number = null

	for (let i = 0; i < focusArea.length; i++) {
		const p1 = focusArea[i]
		const p2 = focusArea[(i + 1) % focusArea.length]

		const edge = [p2[0] - p1[0], p2[1] - p1[1]]
		const toPoint = [point[0] - p1[0], point[1] - p1[1]]

		const cross = crossProduct(edge, toPoint)

		if (prevCrossProduct === null) {
			prevCrossProduct = cross
		} else if (
			(cross > 0 && prevCrossProduct < 0) ||
			(cross < 0 && prevCrossProduct > 0)
		) {
			return false
		}
	}
	return true
}

const crossProduct = (p1: number[], p2: number[]) => {
	return p1[0] * p2[1] - p1[1] * p2[0]
}

const calculateDistanceToLine = (
	point: [number, number],
	lineStart: [number, number],
	lineEnd: [number, number]
): DistanceType => {
	const [pointX, pointY] = point
	const [startX, startY] = lineStart
	const [endX, endY] = lineEnd

	const deltaX = endX - startX
	const deltaY = endY - startY

	const vectorToPointX = pointX - startX
	const vectorToPointY = pointY - startY

	const dotProduct = vectorToPointX * deltaX + vectorToPointY * deltaY
	const lineLengthSquared = deltaX * deltaX + deltaY * deltaY

	const projectionFactor = dotProduct / lineLengthSquared

	const [closestX, closestY] = getClosestPointOnLine(
		projectionFactor,
		lineStart,
		lineEnd,
		deltaX,
		deltaY
	)

	return {
		distance: calculateDistance(pointX, pointY, closestX, closestY),
		distanceX: Math.abs(pointX - closestX),
		distanceY: Math.abs(pointY - closestY),
	}
}

const getClosestPointOnLine = (
	projectionFactor: number,
	lineStart: number[],
	lineEnd: any,
	deltaX: number,
	deltaY: number
) => {
	if (projectionFactor < 0) {
		return lineStart
	} else if (projectionFactor > 1) {
		return lineEnd
	} else {
		return [
			lineStart[0] + projectionFactor * deltaX,
			lineStart[1] + projectionFactor * deltaY,
		]
	}
}

const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
	const dx = x1 - x2
	const dy = y1 - y2

	return Math.sqrt(dx * dx + dy * dy)
}
