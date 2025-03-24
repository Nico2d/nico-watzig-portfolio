import { useRouter } from 'next/router'
import { HeaderMobile } from './HeaderMobile'
import { HeaderDesktop } from './HeaderDesktop'
import { motion } from 'motion/react'

export type NavItemType = { label: string; page: string; link?: string }

const navItems: NavItemType[] = [
	{ label: 'Home', page: '/' },
	{ label: 'Projects', page: '/projects' },
	{ label: 'Contact', page: '/contact' },
]

export const Header = ({ isHidden = false }: { isHidden?: boolean }) => {
	const { pathname } = useRouter()

	return (
		<motion.header
			variants={{
				visible: {
					opacity: 1,
					transition: {
						delay: 0.2,
						duration: 0.5,
						ease: 'easeInOut',
					},
				},
				hidden: {
					opacity: 0,
					transition: { duration: 0, ease: 'easeInOut' },
				},
			}}
			initial="hidden"
			animate={isHidden ? 'hidden' : 'visible'}
			className="absolute inset-x-0 top-0 w-full z-50 container mx-auto px-4"
		>
			<HeaderDesktop navItems={navItems} pathname={pathname} />
			<HeaderMobile navItems={navItems} pathname={pathname} />
		</motion.header>
	)
}
