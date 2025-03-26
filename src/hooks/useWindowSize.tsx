'use client'

import { useEffect, useState } from 'react'

type resolutionType = {
	width: number
	height: number
}

export const useWindowSize = () => {
	const [resolution, setResolution] = useState<resolutionType>({
		width: 0,
		height: 0
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
	}, [ ])

	return {
		resolution,
		isMobile: resolution.width < 1024,
		isDesktop: resolution.width >= 1024,
	}
}

// import { useState, useEffect } from 'react';

interface ScreenInfo {
	width: number
	height: number
	isMobile: boolean
	isDesktop: boolean
}

export const useScreenInfo = (): ScreenInfo => {
	const [screenInfo, setScreenInfo] = useState<ScreenInfo>({
		width: window.innerWidth,
		height: window.innerHeight,
		isMobile: window.innerWidth < 768,
		isDesktop: window.innerWidth >= 768,
	})

	useEffect(() => {
		const handleResize = () => {
			setScreenInfo({
				width: window.innerWidth,
				height: window.innerHeight,
				isMobile: window.innerWidth < 768,
				isDesktop: window.innerWidth >= 768,
			})
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return screenInfo
}

export default useScreenInfo
