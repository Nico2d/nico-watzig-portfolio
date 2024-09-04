import Link from 'next/link'

export const ProjectButton = ({ viewRef, isInView }) => {
	return (
		<>
			<p
				ref={viewRef}
				className="mt-10 mb-2 text-gray-500 text-xl"
				style={{
					transform: isInView ? 'none' : 'translateX(-200px)',
					opacity: isInView ? 1 : 0,
					transition:
						'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
				}}
			>
				Stick around to see some of my work.
			</p>

			<div
				ref={viewRef}
				style={{
					transform: isInView ? 'none' : 'translateY(50px)',
					opacity: isInView ? 1 : 0,
					transition:
						'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
				}}
			>
				<Link
					href="/projects"
					className="btn tracking-wide"
					aria-label="Latest projects"
				>
					SEE MY PROJECTS
				</Link>
			</div>
		</>
	)
}
