import Header from '../components/header'
import ExtLink from '../components/ext-link'
import GitHub from '../components/svgs/github'
import Envelope from '../components/svgs/envelope'
import LinkedIn from '../components/svgs/linkedin'
import Landscape from '../components/svgs/landscape'

const contacts = [
	{
		Comp: GitHub,
		alt: 'github icon',
		link: 'https://github.com/Nico2d',
	},
	{
		Comp: LinkedIn,
		alt: 'linkedin icon',
		link: 'https://www.linkedin.com/in/nico-wätzig-426b321bb/',
	},
	{
		Comp: Envelope,
		alt: 'envelope icon',
		link: 'mailto:nico.watzig@gmail.com?subject=Portfolio Website',
	},
]

export default function Contact() {
	return (
		<div>
			<Header titlePre="Contact" />
			<div>
				<h1 className="text-6xl bold">Contact</h1>

				<div className="flex flex-row gap-8 mt-8">
					{contacts.map(({ Comp, link, alt }) => {
						return (
							<ExtLink key={link} href={link} aria-label={alt}>
								<Comp height={32} fill="#ffffff" />
							</ExtLink>
						)
					})}
				</div>

				<div className="fixed -bottom-20 -right-6 h-screen aspect-square">
					<Landscape />
				</div>
			</div>
		</div>
	)
}
