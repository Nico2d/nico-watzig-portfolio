import { ContactIcons } from '../ui/ContactIcons'
import { NavItemType } from './Header'
import { NavItems } from './NavItems'

interface HeaderDesktopProps {
	navItems: NavItemType[]
}

export const HeaderDesktop = ({ navItems }: HeaderDesktopProps) => {
	return (
		<nav className="hidden lg:flex flex-1 flex-row justify-between items-center">
			<ContactIcons size={24} />

			<ul className="flex flex-1 flex-row uppercase justify-end py-8 gap-3 md:gap-10 tracking-widest text-sm md:text-lg">
				<NavItems navItems={navItems} />
			</ul>
		</nav>
	)
}
