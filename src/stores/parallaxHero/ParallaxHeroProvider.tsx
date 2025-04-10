'use client'

import { useEffect, useState } from 'react'
import { ParallaxHeroContext } from './ParallaxHeroContext'
import { useAnimation } from 'motion/react'

interface IParallaxHeroProvider {
	children: React.ReactNode
}

export const ParallaxHeroProvider = ({ children }: IParallaxHeroProvider) => {
	const [isLandingUnlock, setIsLandingUnlock] = useState<boolean>()
	const controls = useAnimation()
	// isLandingUnlock = fullscreen

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

	const landingUnlock = async () => {
		setIsLandingUnlock(!isLandingUnlock)

		await controls.start('default')
		setIsInContainer(!isInContainer)
	}

	const landingLock = () => {
		console.log('landingLock')
		// saveIsLandingUnlock(false)
		setIsInContainer(true)
		setIsLandingUnlock(false)
	}

	return (
		<ParallaxHeroContext.Provider
			value={{
				controls,
				isLandingUnlock,
				saveIsLandingUnlock,
				isInContainer,
				landingUnlock,
				landingLock,
				setIsInContainer,
				setIsLandingUnlock,
			}}
		>
			{children}
		</ParallaxHeroContext.Provider>
	)
}
