import { Header } from '@/components/header/Header'
import { ParallaxHero } from '@/components/sections/landing/ParallaxHero/ParallaxHero'
import { IntroductionSection } from '@/components/sections/landing/IntroductionSection'
import { HelloTextAnimation } from '@/components/sections/landing/HelloTextAnimation'
import { DiscoverButton } from '@/components/ui/DiscoverButton'
import { useWindowSize } from '@/hooks/useWindowSize'
import { MobileLandingInfo } from './MobileLandingInfo'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { motion, useAnimation, Variants } from 'motion/react'

const useFocusRect = () => {
	const { resolution } = useWindowSize()
	const focusAreaRef = useRef<HTMLDivElement>(null)
	const [key, setKey] = useState(0)

	useEffect(() => {
		if (focusAreaRef.current) {
			console.log('TO:', focusAreaRef.current)
		}
	}, [key])

	const FocusArea = ({ className }) => {
		return <div key={key} ref={focusAreaRef} className={className}></div>
	}

	const getPosition = () => {
		if (focusAreaRef) {
			return focusAreaRef.current?.getBoundingClientRect()
		}

		return null
	}

	function getContainerWidth(resolution) {
		if (resolution >= 1536) return 1536
		if (resolution >= 1280) return 1280
		if (resolution >= 1024) return 1024
		if (resolution >= 768) return 768
		if (resolution >= 640) return 640
		return resolution
	}

	const getLeftPosition = () => {
		const padding = 16
		const marginWidth =
			resolution.width - getContainerWidth(resolution.width)

		return marginWidth / 2 + padding
	}

	console.log('my left positon: ', getLeftPosition())

	return { getLeftPosition }
}

interface LandingSectionProps {
	isLandingUnlock: boolean
	setIsLandingUnlock: Dispatch<SetStateAction<boolean>>
}

export default function LandingSection({
	isLandingUnlock,
	setIsLandingUnlock,
}: LandingSectionProps) {
	const { isDesktop, resolution } = useWindowSize()

	const containerRef = useRef<HTMLDivElement>(null)
	const [leftPosition, setLeftPosition] = useState(0)

	useEffect(() => {
		if (containerRef.current) {
			const rect = containerRef.current.getBoundingClientRect()
			setLeftPosition(rect.left)
		}
	}, [])

	const { getLeftPosition } = useFocusRect()

	// const focusAreaRef = useRef(null)

	// const getPosition = (ref) => {
	// 	return ref.current?.getBoundingClientRect()
	// }

	// console.log('ref:', getPosition())

	// useEffect(() => {
	// 	console.log('useEffect ref:', getPosition())
	// }, [])

	// console.log('leftPosition: ', resolution - )

	const handleLoad = () => {
		// setZaładowano(true)

		console.log('handleLoad: ', containerRef)

		if (containerRef.current) {
			const rect = containerRef.current.getBoundingClientRect()
			console.log('rect: ', rect)

			// setLeftPosition(rect.left)
		}
	}

	return (
		<>
			<Header isHidden={isDesktop && !isLandingUnlock} />

			{isDesktop ? (
				<>
					{/* DESKTOP */}
					<div className="h-screen"></div>

					<div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden bg-landing-lock-right-bg">
						<div className="absolute left-0 top-0 right-1/2 bottom-0 bg-landing-lock-left-bg left-section left-side-polygon z-[1]" />
						<div className="relative container mx-auto px-4 h-screen z-10">
							<HelloTextAnimation />
						</div>

						<div
							className="absolute left-0 right-0 top-0 bottom-0 translate-x-[25%]"
							style={{
								zIndex: isLandingUnlock ? 21 : 0,
							}}
						>
							<ParallaxHero isLocked={isLandingUnlock} />
						</div>

						<BlackBox2
							isLandingUnlock={isLandingUnlock}
							onClick={() => setIsLandingUnlock(!isLandingUnlock)}
							BoundingClientRect={{
								left: getLeftPosition(),
								bottom: 100,
							}}
						/>
					</div>

					{isLandingUnlock && (
						<div className="container mx-auto px-4">
							<div className="absolute top-1/2 -translate-y-1/2 z-40">
								<IntroductionSection />
							</div>
						</div>
					)}
				</>
			) : (
				<>
					{/* MOBILE */}
					<div className="h-screen"></div>
					{/* WHY? h-screen make space of screen and absolte perfect mach h-screen on mobile devices insted of 100vhh :/ */}
					<div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden bg-landing-lock-right-bg">
						<ParallaxHero isLocked={false} />
						<MobileLandingInfo />
					</div>
				</>
			)}
		</>
	)
}

const BlackBox2 = ({ isLandingUnlock, onClick, BoundingClientRect }) => {
	const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)
	const [
		animationInterval,
		setAnimationInterval,
	] = useState<NodeJS.Timeout | null>(null)
	const controls = useAnimation()

	const { resolution } = useWindowSize()

	useEffect(() => {
		console.log('[change] isLandingUnlock: ', isLandingUnlock)

		// if (isLandingUnlock) {
		// 	if (animationInterval) {
		// 		clearInterval(animationInterval)
		// 	}

		// 	console.log('Expanded!!!')
		// 	controls.start('expanded')

		// 	return
		// } else {
		// 	controls.start('default')
		// }

		// return () => {
		// 	if (animationInterval) {
		// 		clearInterval(animationInterval)
		// 	}
		// }
	}, [isLandingUnlock])

	console.log('MY super ref in black box:', BoundingClientRect)

	const boxVariants: Variants = {
		default: {
			bottom: `${BoundingClientRect.bottom}px`,
			left: `${BoundingClientRect.left}px`,
			top: `${resolution.height - BoundingClientRect.bottom - 80}px`,
			right: `${resolution.width - BoundingClientRect.left - 80}px`,
		},
		expanded: {
			bottom: 0,
			left: 0,
			top: 0,
			right: 0,
		},
	}

	return (
		<motion.div
			className="bg-landing-unlock-primary cursor-pointer absolute z-20"
			variants={boxVariants}
			// animate={controls}
			animate={isLandingUnlock ? 'expanded' : 'default'}
			initial={isLandingUnlock ? 'unlocked' : 'locked'}
			onAnimationStart={() => {
				setIsAnimationPlaying(true)
			}}
			onAnimationComplete={() => {
				setIsAnimationPlaying(false)
			}}
			onClick={onClick}
		/>
	)
}
