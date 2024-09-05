import { motion } from 'framer-motion'

export const DiscoverButton = ({
	size = 80,
	onClick,
	isLandingAnimating: isBackgroundMode,
}) => {
	const buttonVariants = {
		normal: {
			bottom: '100px',
			left: '100px',
		},
		extended: {
			bottom: '0px',
			left: `0px`,
		},
	}

	const backgroundVariants = {
		normal: {
			width: `80px`,
			height: `80px`,
		},
		extended: {
			width: `100vw`,
			height: `100vh`,
		},
	}

	return (
		<motion.button
			className={`landing-action-btn h-[${size}px] z-20`}
			onClick={onClick}
			animate={!isBackgroundMode ? 'normal' : 'extended'}
			variants={buttonVariants}
		>
			<span className={`landing-action-circle before:size-[${size}px]`}>
				<motion.div
					className={`landing-action-circle-background`}
					variants={backgroundVariants}
				/>
				<span className={`relative pl-[30px]`}>
					{isBackgroundMode ? 'I changed my mind' : 'Give a chance'}
				</span>
			</span>
		</motion.button>
	)
}
