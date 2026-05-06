import { useRef } from 'react'
import { m, useInView } from 'motion/react'
import { quickFacts, tldr } from './config'

export function TldrCard() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-80px' })

	return (
		<m.div
			ref={ref}
			initial={{ opacity: 0, y: 24 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.6, ease: [0.17, 0.55, 0.55, 1] }}
			className="relative rounded-2xl border border-badge-dark/60 bg-gradient-to-br from-badge-light to-white/80 dark:from-surface dark:to-background px-6 py-7 md:px-8 md:py-9 shadow-[0_0_60px_-20px_rgba(255,32,78,0.35)] dark:shadow-[0_0_80px_-20px_rgba(255,32,78,0.25)]"
		>
			<p className="text-xl md:text-2xl font-semibold leading-snug">
				{tldr}
			</p>

			<dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
				{quickFacts.map(({ label, value }) => (
					<div key={label}>
						<dt className="text-xs uppercase tracking-wider opacity-60">
							{label}
						</dt>
						<dd className="text-sm md:text-base font-semibold mt-1">
							{value}
						</dd>
					</div>
				))}
			</dl>
		</m.div>
	)
}
