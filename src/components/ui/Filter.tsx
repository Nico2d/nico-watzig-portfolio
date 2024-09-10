import { useRef, useState } from 'react'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'
import { FilterButton } from './FilterButton'
import { FILTER_TECHNOLOGIES } from '@/constants/technologies'

export function Filter({ onClick = (f) => f }) {
	const animRef = useRef(null)
	const isInView = useInView(animRef, { once: true })
	const [activeFilter, setActiveFilter] = useState(FILTER_TECHNOLOGIES[0].id)

	const handleFilterClick = (filter) => {
		onClick(filter)
		setActiveFilter(filter)
	}

	return (
		<LazyMotion features={domAnimation}>
			<div
				ref={animRef}
				className="flex items-start flex-col sm:flex-row sm:items-center gap-4 my-10"
				style={{
					opacity: isInView ? 1 : 0,
					transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s',
				}}
			>
				<h3
					aria-label="Filter projects"
					tabIndex={0}
					className="font-bold text-xl"
				>
					Filter by:
				</h3>
				<div className="flex items-center gap-4">
					{FILTER_TECHNOLOGIES.map((item) => (
						<FilterButton
							key={item.id}
							onClick={() => handleFilterClick(item.id)}
							label={item.id}
							active={activeFilter === item.id}
						>
							{item.content}
						</FilterButton>
					))}
				</div>
			</div>
		</LazyMotion>
	)
}
