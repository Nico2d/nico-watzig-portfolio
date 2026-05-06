import { HeadingDivider } from '../../HeadingDivider'
import Link from 'next/link'
import { domAnimation, LazyMotion } from 'motion/react'
import { timeline } from './config'
import { TldrCard } from './TldrCard'
import { Timeline } from './Timeline'

export function AboutSection() {
	return (
		<LazyMotion features={domAnimation}>
			<section id="about" className="section">
				<HeadingDivider title="About me" />

				<div className="pt-10 max-w-5xl mx-auto flex flex-col gap-12">
					<TldrCard />
					<Timeline items={timeline} />

					<div className="mx-auto mt-4">
						<Link
							href="/projects"
							className="btn tracking-wide"
							aria-label="Latest projects"
						>
							My other projects
						</Link>
					</div>
				</div>
			</section>
		</LazyMotion>
	)
}
