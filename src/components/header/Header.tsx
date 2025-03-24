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

	// isHidden = true   --->   = y=20 => y=0

	// isHidden = false   --->   = y=0 => y=-20

	return (
		// <header
		// 	className="absolute inset-x-0 top-0 w-full container-md z-50 transition-opacity delay-500 duration-1000"
		// 	style={{
		// 		visibility: isHidden ? 'hidden' : 'visible',
		// 		opacity: isHidden ? 0 : 1,
		// 	}}
		// >

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
			className="absolute inset-x-0 top-0 w-full container-md z-50"
		>
			<HeaderDesktop navItems={navItems} pathname={pathname} />
			<HeaderMobile navItems={navItems} pathname={pathname} />
		</motion.header>
		// </header>
	)
}
