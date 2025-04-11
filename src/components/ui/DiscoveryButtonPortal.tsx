'use client'

import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { DiscoveryButton } from './DiscoveryButton'
import { useParallaxHero } from '@/stores/parallaxHero/useParallaxHero'
import { motion } from 'motion/react'
import { useParallaxFocus } from '@/hooks/useParallaxFocus'

export const DiscoveryButtonPortal = () => {
	const {
		controls,
		landingLock,
		isInContainer,
		initialAnimation,
	} = useParallaxHero()
	const { boundingClientRect } = useParallaxFocus()
	const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
		null
	)

	useEffect(() => {
		setPortalContainer(document.getElementById('discovery-root'))
	}, [])

	useEffect(() => {
		if (!isInContainer) {
			controls.start('fullscreen')
		}
	}, [isInContainer])

	const component = <DiscoveryButton />

	if (!portalContainer || !boundingClientRect) {
		console.warn('Element of ID "discovery-root" is missing.')
		return component
	}

	const portalComponent = (
		<>
			<motion.div
				className={`bg-landing-unlock-primary absolute z-[10]`}
				variants={{
					default: {
						bottom: boundingClientRect.bottom,
						left: boundingClientRect.left,
						width: boundingClientRect.width,
						height: boundingClientRect.height,
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
				initial={initialAnimation}
			/>

			<motion.div
				className={`absolute text-2xl whitespace-nowrap bottom-[100px] z-[30] cursor-pointer`}
				style={{
					left: boundingClientRect.left,
					padding: 16,
					marginLeft: 0,
				}}
				animate={'fullscreen'}
				onClick={landingLock}
			>
				I changed my mind
			</motion.div>
			<motion.div
				className={`absolute bottom-[100px] bg-primary cursor-pointer z-[12]`}
				style={{
					bottom: boundingClientRect.bottom - 6,
					left: boundingClientRect.left - 26,
					width: boundingClientRect.width,
					height: boundingClientRect.height,
				}}
				initial={initialAnimation}
				variants={{
					default: {
						scale: 0,
					},
					fullscreen: {
						scale: 0.5,
						transition: {
							ease: 'easeInOut',
						},
					},
				}}
				animate={controls}
				onClick={landingLock}
			/>
		</>
	)

	if (isInContainer) {
		return component
	} else {
		return ReactDOM.createPortal(portalComponent, portalContainer)
	}
}
