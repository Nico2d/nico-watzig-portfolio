import { AnimationControls } from 'motion/react'
import { createContext } from 'react'

interface ParallaxHeroContextType {
	controls: AnimationControls
	isLandingUnlock?: boolean
	saveIsLandingUnlock: (value: boolean) => void
	isInContainer?: boolean
	landingUnlock: () => void
	landingLock: () => void
	setIsInContainer: (value: boolean) => void
	initialAnimation: 'default' | 'fullscreen'
}

export const ParallaxHeroContext = createContext<
	ParallaxHeroContextType | undefined
>(undefined)
