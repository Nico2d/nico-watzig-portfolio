import Link from 'next/link'

export function ProjectLink({
	project,
	children,
}: {
	project: string
	children: React.ReactNode
}) {
	return (
		<Link className="custom-link" href={`/projects/${project}`}>
			{children}
		</Link>
	)
}
