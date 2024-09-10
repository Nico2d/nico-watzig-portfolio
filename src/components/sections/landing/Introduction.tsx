export const Introduction = ({ viewRef, isInView }) => {
	return (
		<h1
			tabIndex={0}
			className="text-3xl md:text-5xl xl:text-6xl font-bold"
			ref={viewRef}
			style={{
				transform: isInView ? 'none' : 'translateX(-200px)',
				opacity: isInView ? 1 : 0,
				transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
			}}
		>
			<p>
				Hi, I&apos;m <mark>Nico Wätzig</mark> a passionate{' '}
				<mark>software developer.</mark>
			</p>
		</h1>
	)
}
