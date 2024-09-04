import { useRef } from 'react'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'
import { Introduction } from '../landing/Introduction'
import { WorkArea } from '../landing/Workarea'
import { ProjectButton } from '../landing/ProjectButton'

export function WelcomeSection() {
	const viewRef = useRef(null)
	const isInView = useInView(viewRef, { once: true })

	return (
		<LazyMotion features={domAnimation}>
			<section id="intro" className="section">
				<div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] lg:grid-cols-[1fr_0.7fr] gap-4 items-center">
					<div className="py-5 md:py-10">
						<Introduction isInView={isInView} viewRef={viewRef} />
						<WorkArea isInView={isInView} viewRef={viewRef} />

						<ProjectButton isInView={isInView} viewRef={viewRef} />
					</div>
				</div>
			</section>
		</LazyMotion>
	)
}
