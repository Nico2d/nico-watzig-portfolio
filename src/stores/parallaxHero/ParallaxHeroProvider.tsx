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

	const [isInContainer, setIsInContainer] = useState<boolean>()

	const saveIsLandingUnlock = (value: boolean) => {
		localStorage.setItem('isLandingUnlock', value.toString())
		setIsLandingUnlock(value)
	}

	useEffect(() => {
		const storedValue = localStorage.getItem('isLandingUnlock')
		if (storedValue) {
			const isLandingUnlockValue = storedValue === 'true'

			saveIsLandingUnlock(isLandingUnlockValue)
			setIsInContainer(!isLandingUnlockValue)
		}
	}, [])

	const landingUnlock = async () => {
		setIsInContainer(false)
		saveIsLandingUnlock(true)
	}

	const landingLock = async () => {
		saveIsLandingUnlock(false)
		await controls.start('default')
		setIsInContainer(true)
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
			}}
		>
			{children}
		</ParallaxHeroContext.Provider>
	)
}
