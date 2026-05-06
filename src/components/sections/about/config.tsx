import { ProjectLink } from './ProjectLink'

export type QuickFact = {
	label: string
	value: string
}

export type TimelineItem = {
	year: string
	role: string
	place: string
	body: React.ReactNode
}

export const quickFacts: QuickFact[] = [
	{ label: 'Based in', value: 'Poland' },
	{
		label: 'Experience',
		value: `${new Date().getFullYear() - 2019}+ years`,
	},
	{ label: 'Focus', value: 'React · TypeScript · AI' },
	{ label: 'Status', value: 'Open to work' },
]

export const tldr = (
	<>
		Frontend developer who turns{' '}
		<mark>complex products into clean, fast UIs</mark>. Six years across
		freelance, agencies, and OTT platforms — React, TypeScript,
		BrightScript, and whatever the project actually needs.
	</>
)

export const timeline: TimelineItem[] = [
	{
		year: '2018',
		role: 'M.Sc. Computer Science',
		place: 'Opole University of Technology',
		body: (
			<>
				Solid CS foundations — algorithms, software architecture, and a
				healthy obsession with clean code.
			</>
		),
	},
	{
		year: '2019',
		role: 'Frontend Intern',
		place: 'Axabee',
		body: (
			<>
				First touch with React and WordPress. Shipped the{' '}
				<ProjectLink project="axabee">company website</ProjectLink>{' '}
				built on JAMstack — fast, statically generated, SEO-tuned.
			</>
		),
	},
	{
		year: '2020',
		role: 'Freelance Developer',
		place: 'Independent',
		body: (
			<>
				Custom WordPress builds and bespoke tools for local businesses:
				an{' '}
				<ProjectLink project="inteligentne-reklamy">
					interactive ad-spot map
				</ProjectLink>
				, a{' '}
				<ProjectLink project="prime-garage">
					real-time garage designer
				</ProjectLink>
				, and a generator that pulls cemetery records out of Excel.
			</>
		),
	},
	{
		year: '2021',
		role: 'Software Developer',
		place: 'Better Software Group',
		body: (
			<>
				Joined a product team building Better Media Suite — a
				cross-platform OTT product. Deepened my React skills and learned
				how large frontends actually scale.
			</>
		),
	},
	{
		year: '2022',
		role: 'OTT & Streaming',
		place: 'BMS · Roku · SiriusXM',
		body: (
			<>
				Web and <ProjectLink project="bms-roku">Roku</ProjectLink>{' '}
				platforms for{' '}
				<ProjectLink project="the-better">The Better</ProjectLink>,{' '}
				<ProjectLink project="siriusxm">SiriusXM</ProjectLink>,{' '}
				<ProjectLink project="disc-golf-network">
					Disc Golf Network
				</ProjectLink>
				, <ProjectLink project="fanmio">Fanmio</ProjectLink>, and
				PlayKids+. BrightScript, app architecture, performance work on
				constrained devices.
			</>
		),
	},
	{
		year: 'Today',
		role: 'Independent Developer',
		place: 'Self-employed · B2B',
		body: (
			<>
				Running my own practice — taking on ambitious products where
				TypeScript, design sensibility, and clean architecture actually
				pay off. Currently exploring motion design and 3D on the web.
			</>
		),
	},
]
