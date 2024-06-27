import Header from '../components/header'
import ExtLink from '../components/ext-link'

import sharedStyles from '../styles/shared.module.css'
import contactStyles from '../styles/contact.module.css'

import GitHub from '../components/svgs/github'
import Envelope from '../components/svgs/envelope'
import LinkedIn from '../components/svgs/linkedin'

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
		<>
			<Header titlePre="Contact" />
			<div className={sharedStyles.layout}>
				<h1 style={{ marginTop: 0 }}>Contact</h1>

				<div className={contactStyles.name}>
					<ExtLink href="https://vercel.com">Vercel</ExtLink>
				</div>

				<div className={contactStyles.links}>
					{contacts.map(({ Comp, link, alt }) => {
						return (
							<ExtLink key={link} href={link} aria-label={alt}>
								<Comp height={32} />
							</ExtLink>
						)
					})}
				</div>
			</div>
		</>
	)
}
