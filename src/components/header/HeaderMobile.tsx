import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { ContactIcons } from '../ui/ContactIcons'
import { NavItemType } from './Header'
import Link from 'next/link'
import ExtLink from '../ext-link'

interface HeaderMobileProps {
	navItems: NavItemType[]
}
export const HeaderMobile = ({ navItems }: HeaderMobileProps) => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

	const toggleMenu = () => setMobileMenuOpen((prev) => !prev)

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.classList.add('overflow-hidden')
		} else {
			document.body.classList.remove('overflow-hidden')
		}

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
					<div className="absolute container mx-auto px-4 top-0 py-4 w-full flex justify-end">
						<button onClick={toggleMenu} aria-label="Close Menu">
							<FiX size={32} />
						</button>
					</div>

					{/* TODO: this is the same as in HeaderDesktop */}
					<ul className="space-y-12 text-xl uppercase text-center">
						{navItems.map(({ label, page, link }) => {
							const isCurrentPage = false

							return (
								<li key={label} onClick={toggleMenu}>
									{page ? (
										<Link
											href={page}
											className={
												isCurrentPage
													? 'highlight'
													: undefined
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
