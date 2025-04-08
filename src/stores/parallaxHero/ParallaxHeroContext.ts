import { createContext } from 'react'

interface ParallaxHeroContextType {
	isLandingUnlock?: boolean
	saveIsLandingUnlock: (value: boolean) => void
	isInContainer?: boolean
	landingUnlock: () => void
	landingLock: () => void
}

export const ParallaxHeroContext = createContext<
	ParallaxHeroContextType | undefined
>(undefined)
