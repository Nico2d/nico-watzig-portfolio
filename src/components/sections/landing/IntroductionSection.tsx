import { useRef } from 'react'
import { Introduction } from './Introduction'
import { ProjectButton } from './ProjectButton'
import { WorkArea } from './WorkArea'
import { useInView, LazyMotion, domAnimation } from 'motion/react'

export function IntroductionSection() {
	const viewRef = useRef(null)
	const isInView = useInView(viewRef, { once: true })

	return (
		<LazyMotion features={domAnimation}>
			<section id="intro">
				<Introduction isInView={isInView} viewRef={viewRef} />
				<WorkArea isInView={isInView} viewRef={viewRef} />
				<ProjectButton isInView={isInView} viewRef={viewRef} />
			</section>
		</LazyMotion>
	)
}
