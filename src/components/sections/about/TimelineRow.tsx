import { useRef } from 'react'
import { m, useInView } from 'motion/react'
import { TimelineItem } from './config'
import { TimelineContent } from './TimelineContent'

export function TimelineRow({
	item,
	index,
}: {
	item: TimelineItem
	index: number
}) {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-60px' })
	const isLeft = index % 2 === 0

	return (
		<m.li
			ref={ref}
			initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
			animate={isInView ? { opacity: 1, x: 0 } : {}}
			transition={{
				duration: 0.55,
				ease: [0.17, 0.55, 0.55, 1],
				delay: index * 0.05,
			}}
			className="relative md:grid md:grid-cols-2 md:gap-10"
		>
			{/* dot — sits on the line */}
			<span
				aria-hidden
				className="absolute top-1 w-4 h-4 rounded-full bg-primary left-0 md:left-1/2 md:-translate-x-1/2"
			/>

			<TimelineContent
				item={item}
				className={
					isLeft
						? 'pl-8 md:pl-0 md:pr-8 md:text-right md:col-start-1'
						: 'pl-8 md:pl-8 md:pr-0 md:col-start-2'
				}
				alignRight={isLeft}
			/>
		</m.li>
	)
}
