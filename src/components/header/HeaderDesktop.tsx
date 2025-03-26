import Link from 'next/link'
import ExtLink from '../ext-link'
import { ContactIcons } from '../ui/ContactIcons'
import { NavItemType } from './Header'

interface HeaderDesktopProps {
	navItems: NavItemType[]
}

export const HeaderDesktop = ({ navItems }: HeaderDesktopProps) => {
	return (
		<nav className="hidden lg:flex flex-1 flex-row justify-between items-center">
			<ContactIcons size={24} />

			<ul className="flex flex-1 flex-row uppercase justify-end py-8 gap-3 md:gap-10 tracking-widest text-sm md:text-lg">
				{navItems.map(({ label, page, link }) => {
					const isHome = page === navItems[0].page
					// const isPage = isHome
					// 	? pathname === '/'
					// 	: pathname.includes(page)

					const isCurrentPage = false

					return (
						<li key={label}>
							{page ? (
								<Link
									href={page}
									className={
										isCurrentPage ? 'highlight' : undefined
									}
								>
									{label}
								</Link>
							) : (
								<ExtLink href={link}>{label}</ExtLink>
							)}
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
