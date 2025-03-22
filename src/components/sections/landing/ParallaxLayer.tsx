interface ParallaxLayerProps {
	children: React.ReactElement
	transform?: string
	isAnimating?: boolean
}

export const ParallaxLayer = ({
	children,
	transform = '',
	isAnimating = false,
}: ParallaxLayerProps) => {
	return (
		<div
			className={`parallax-layer ${
				isAnimating ? 'transition-transform' : 'transition-none'
			}`}
			style={{
				transform: transform,
			}}
		>
			{children}
		</div>
	)
}
