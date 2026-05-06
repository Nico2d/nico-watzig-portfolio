import { TimelineItem } from './config'

export function TimelineContent({
	item,
	className,
	alignRight,
}: {
	item: TimelineItem
	className: string
	alignRight: boolean
}) {
	return (
		<div className={className}>
			<div
				className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${
					alignRight ? 'md:justify-end' : ''
				}`}
			>
				<span className="text-primary font-bold text-sm md:text-base tracking-wide">
					{item.year}
				</span>
				<h3 className="text-lg md:text-xl font-bold">{item.role}</h3>
				<span className="text-sm md:text-base opacity-70">
					{item.place}
				</span>
			</div>

			<p
				className={`mt-2 text-base font-light leading-relaxed ${
					alignRight ? 'md:text-right' : 'md:text-left'
				}`}
			>
				{item.body}
			</p>
		</div>
	)
}
