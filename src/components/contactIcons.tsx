import { contactsData } from '../constants/contact'
import ExtLink from './ext-link'

export const ContactIcons = ({ size = 32 }) => {
	return (
		<div className="flex flex-row gap-4 md:gap-8">
			{contactsData.map(({ Comp, link, alt }) => {
				return (
					<ExtLink key={link} href={link} aria-label={alt}>
						<Comp height={size} fill="#ffffff" />
					</ExtLink>
				)
			})}
		</div>
	)
}
