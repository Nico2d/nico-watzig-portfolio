import { useRouter } from 'next/router'
import { HeaderMobile } from './HeaderMobile'
import { HeaderDesktop } from './HeaderDesktop'
import { motion } from 'motion/react'

export type NavItemType = { label: string; page: string; link?: string }

const navItems: NavItemType[] = [
	{ label: 'Home', page: '/' },
	{ label: 'Projects', page: '/projects' },
]

export const Header = ({ isHidden = false }: { isHidden?: boolean }) => {
	return (
		<motion.header
			variants={{
				visible: {
					opacity: 1,
					visibility: 'visible',
					transition: {
						delay: 0.2,
						duration: 0.5,
						ease: 'easeInOut',
					},
				},
				hidden: {
					opacity: 0,
					visibility: 'hidden',
					transition: { duration: 0, ease: 'easeInOut' },
				},
			}}
			initial="hidden"
			animate={isHidden ? 'hidden' : 'visible'}
			className="absolute inset-x-0 top-0 w-full z-50 container mx-auto px-4"
		>
			<HeaderDesktop navItems={navItems} />
			<HeaderMobile navItems={navItems} />
		</motion.header>
	)
}
