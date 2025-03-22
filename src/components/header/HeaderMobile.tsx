import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { ContactIcons } from '../ui/ContactIcons'
import { NavItemType } from './Header'
import Link from 'next/link'
import ExtLink from '../ext-link'

interface HeaderMobileProps {
	navItems: NavItemType[]
	pathname: string
}
export const HeaderMobile = ({ navItems, pathname }: HeaderMobileProps) => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

	const toggleMenu = () => setMobileMenuOpen((prev) => !prev)

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.classList.add('overflow-hidden')
		} else {
			document.body.classList.remove('overflow-hidden')
		}

		// Cleanup przy odmontowaniu
		return () => document.body.classList.remove('overflow-hidden')
	}, [isMobileMenuOpen])

	return (
		<>
			<nav className="lg:hidden flex items-center justify-between py-4">
				<ContactIcons size={24} />
				<button onClick={toggleMenu} aria-label="Open Menu">
					<FiMenu size={32} />
				</button>
			</nav>

			{isMobileMenuOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-white z-50">
					<button
						onClick={toggleMenu}
						aria-label="Close Menu"
						className="absolute top-4 right-4"
					>
						<FiX size={32} />
					</button>

					<ul className="space-y-12 text-xl uppercase text-center">
						{navItems.map(({ label, page, link }) => {
							const isHome = page === navItems[0].page
							const isPage = isHome
								? pathname === '/'
								: pathname.includes(page)

							return (
								<li key={label} onClick={toggleMenu}>
									{page ? (
										<Link
											href={page}
											className={
												isPage ? 'highlight' : undefined
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
				</div>
			)}
		</>
	)
}
