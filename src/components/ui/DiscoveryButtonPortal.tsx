'use client'

import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { DiscoveryButton } from './DiscoveryButton'
import { useParallaxHero } from '@/stores/parallaxHero/useParallaxHero'
import { motion, useAnimation } from 'motion/react'
import { BlackBox } from '../sections/landing/BlackBox'
import { useParallaxFocus } from '@/hooks/useParallaxFocus'

export const DiscoveryButtonPortal = () => {
	const {
		landingUnlock,
		controls,
		landingLock,
		isInContainer,
	} = useParallaxHero()
	const { boundingClientRect } = useParallaxFocus()
	const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
		null
	)

	useEffect(() => {
		setPortalContainer(document.getElementById('discovery-root'))
	}, [])

	useEffect(() => {
		if (isInContainer) {
			controls.start('fullscreen')
		}
	}, [isInContainer])

	const component = <DiscoveryButton />

	if (!portalContainer) {
		console.warn('Element of ID "discovery-root" is missing.')
		return component
	}

	if (isInContainer) {
		return ReactDOM.createPortal(
			<motion.div
				className={`bg-landing-unlock-primary absolute z-[10]`}
				variants={{
					default: {
						bottom: boundingClientRect?.bottom,
						left: boundingClientRect?.left,
						width: boundingClientRect?.width,
						height: boundingClientRect?.height,
					},
					fullscreen: {
						bottom: 0,
						left: 0,
						width: '100vw',
						height: '100vh',
						scale: 1,
						rotate: 0,
						borderRadius: '0%',
						transition: {
							ease: 'easeInOut',
							duration: 0.4,
						},
					},
				}}
				animate={controls}
				initial={'default'}
				onClick={landingUnlock}
			/>,
			portalContainer
		)
	} else {
		return component
	}
}
