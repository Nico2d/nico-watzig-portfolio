import { TimelineItem } from './config'
import { TimelineRow } from './TimelineRow'

export function Timeline({ items }: { items: TimelineItem[] }) {
	return (
		<ol className="relative">
			{/* line: left on mobile, centered on md+ */}
			<span
				aria-hidden
				className="absolute top-2 bottom-2 w-px bg-badge-dark left-2 md:left-1/2 md:-translate-x-1/2"
			/>

			<div className="space-y-10 md:space-y-14">
				{items.map((item, idx) => (
					<TimelineRow
						key={item.year + item.place}
						item={item}
						index={idx}
					/>
				))}
			</div>
		</ol>
	)
}
