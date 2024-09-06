import Link from 'next/link'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import { ContactIcons } from './ContactIcons'

const navItems: { label: string; page?: string; link?: string }[] = [
	{ label: 'Home', page: '/' },
	{ label: 'Projects', page: '/projects' },
	{ label: 'Contact', page: '/contact' },
]

export const Header = () => {
	const { pathname } = useRouter()

	return (
		<header className="absolute inset-x-0 top-0 w-full container-md space-y-8 z-50">
			<nav className="flex flex-1 flex-row justify-between items-center">
				<ContactIcons size={24} />

				<ul className="flex flex-1 flex-row uppercase justify-end py-8 gap-3 md:gap-10 tracking-widest text-sm md:text-lg">
					{navItems.map(({ label, page, link }) => {
						const isHome = page === navItems[0].page

						const isPage = isHome
							? pathname === '/'
							: pathname.includes(page)

						return (
							<li key={label}>
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
			</nav>
		</header>
	)
}
