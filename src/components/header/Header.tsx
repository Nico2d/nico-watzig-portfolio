import { useRouter } from 'next/router'
import { HeaderMobile } from './HeaderMobile'
import { HeaderDesktop } from './HeaderDesktop'

export type NavItemType = { label: string; page: string; link?: string }

const navItems: NavItemType[] = [
	{ label: 'Home', page: '/' },
	{ label: 'Projects', page: '/projects' },
	{ label: 'Contact', page: '/contact' },
]

export const Header = () => {
	const { pathname } = useRouter()

	return (
		<header className="absolute inset-x-0 top-0 w-full container-md z-50">
			<HeaderDesktop navItems={navItems} pathname={pathname} />
			<HeaderMobile navItems={navItems} pathname={pathname} />
		</header>
	)
}
