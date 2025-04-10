import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { ContactIcons } from '../ui/ContactIcons'
import { NavItemType } from './Header'
import { NavItems } from './NavItems'

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
				<div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white z-50 backdrop-blur-md">
					<div className="absolute container mx-auto px-4 top-0 py-4 w-full flex justify-end">
						<button onClick={toggleMenu} aria-label="Close Menu">
							<FiX size={32} />
						</button>
					</div>

					<ul className="space-y-12 text-xl uppercase text-center">
						<NavItems navItems={navItems} />
					</ul>
				</div>
			)}
		</>
	)
}
