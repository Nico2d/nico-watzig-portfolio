import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { DiscoveryButton } from './DiscoveryButton'
import { useParallaxHero } from '@/stores/parallaxHero/useParallaxHero'

export const DiscoveryButtonPortal = () => {
	const { isInContainer } = useParallaxHero()
	const portalContainerRef = useRef<HTMLElement | null>(null)

	useEffect(() => {
		portalContainerRef.current = document.getElementById('discovery-root')
	}, [])

	const component = <DiscoveryButton />

	if (!portalContainerRef.current) {
		console.warn('Element of ID "discovery-root" is missing.')
		return component
	}

	return isInContainer
		? ReactDOM.createPortal(component, portalContainerRef.current)
		: component
}
