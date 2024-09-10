export const ParallaxLayer = ({ children, transform = '' }) => {
	const styles = {
		transform: transform,
	}

	return (
		<div className="parallax-layer" style={styles}>
			{children}
		</div>
	)
}
