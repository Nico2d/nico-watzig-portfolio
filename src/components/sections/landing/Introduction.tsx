export const Introduction = ({ viewRef, isInView }) => {
	return (
		<div
			ref={viewRef}
			style={{
				transform: isInView ? 'none' : 'translateX(-200px)',
				opacity: isInView ? 1 : 0,
				transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
			}}
			className="mb-8"
		>
			<p className="text-3xl md:text-5xl xl:text-6xl font-bold">
				Hey, I'm Nico Wätzig.
			</p>
			<p className="text-2xl md:text-4xl xl:text-4xl">
				a passionate{' '}
				<mark className="whitespace-nowrap">Software Developer.</mark>
			</p>
		</div>
	)
}
