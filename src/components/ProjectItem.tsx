import Link from 'next/link'

export const ProjectItem = ({
	title = '',
	description = '',
	thumbnail = '',
	stack = [],
	slug,
}) => {
	if (slug) {
		return (
			<Link
				href={`projects/${slug}`}
				className="icon-link-btn items-start"
			>
				<ProjectCard
					thumbnail={thumbnail}
					title={title}
					description={description}
					stack={stack}
				/>
			</Link>
		)
	} else {
		return (
			<ProjectCard
				thumbnail={thumbnail}
				title={title}
				description={description}
				stack={stack}
			/>
		)
	}
}

const ProjectCard = ({ thumbnail, title, description, stack }) => {
	return (
		<article className="bg-card-light dark:bg-card-dark flex flex-col rounded-lg overflow-hidden h-min min-w-96">
			{thumbnail && (
				<img
					className="aspect-[4/3] w-full h-full object-cover"
					src={thumbnail}
				/>
			)}

			<div className="flex-[2] px-5 py-6 text-center flex flex-col gap-10">
				<header className="flex-1 flex items-center justify-start flex-col gap-3">
					<h3 tabIndex={0} className="text-2xl font-bold">
						{title}
					</h3>

					<p
						tabIndex={0}
						className="text-sm text-justify text-slate-300"
					>
						{description}
					</p>
				</header>

				<footer className="flex flex-col gap-10">
					{!!stack.length && (
						<div className="flex-center flex-wrap gap-3">
							{stack.map((tag) => (
								<span
									key={tag}
									tabIndex={0}
									className="px-2 text-sm leading-normal rounded bg-badge-light/50 dark:bg-badge-dark"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</footer>
			</div>
		</article>
	)
}
