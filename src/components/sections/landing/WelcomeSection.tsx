import { useRef } from 'react'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'
import { Introduction } from './Introduction'
import { ProjectButton } from './ProjectButton'
import { WorkArea } from './WorkArea'

export function WelcomeSection() {
	const viewRef = useRef(null)
	const isInView = useInView(viewRef, { once: true })

	return (
		<LazyMotion features={domAnimation}>
			<section id="intro" className="section w-[700px]">
				<Introduction isInView={isInView} viewRef={viewRef} />
				<WorkArea isInView={isInView} viewRef={viewRef} />
				<ProjectButton isInView={isInView} viewRef={viewRef} />
			</section>
		</LazyMotion>
	)
}
