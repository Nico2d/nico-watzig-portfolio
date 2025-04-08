'use client'

import { useEffect, useState } from 'react'
import { ParallaxHeroContext } from './ParallaxHeroContext'

interface IParallaxHeroProvider {
	children: React.ReactNode
}

export const ParallaxHeroProvider = ({ children }: IParallaxHeroProvider) => {
	const [isLandingUnlock, setIsLandingUnlock] = useState<boolean>()
	const [isInContainer, setIsInContainer] = useState<boolean>()

	const saveIsLandingUnlock = (value: boolean) => {
		localStorage.setItem('isLandingUnlock', value.toString())
		setIsLandingUnlock(value)
	}

	useEffect(() => {
		const storedValue = localStorage.getItem('isLandingUnlock')
		if (storedValue) {
			const isLandingUnlockValue = storedValue === 'true'

			setIsLandingUnlock(isLandingUnlockValue)
		}
	}, [])

	const landingUnlock = () => {
		console.log('landingUnlock')
		saveIsLandingUnlock(true)
		setIsInContainer(true)
	}

	const landingLock = () => {
		console.log('landingLock')
		saveIsLandingUnlock(false)
		setIsInContainer(false)
	}

	return (
		<ParallaxHeroContext.Provider
			value={{
				isLandingUnlock,
				saveIsLandingUnlock,
				isInContainer,
				landingUnlock,
				landingLock,
			}}
		>
			{children}
		</ParallaxHeroContext.Provider>
	)
}
