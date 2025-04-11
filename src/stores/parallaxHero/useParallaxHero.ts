import { useContext } from 'react'
import { ParallaxHeroContext } from './ParallaxHeroContext'

export const useParallaxHero = () => {
	const context = useContext(ParallaxHeroContext)
	if (!context) {
		throw new Error(
			'useParallaxHero must be used within a ParallaxHeroProvider'
		)
	}
	return context
}
