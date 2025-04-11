import { useRouter } from 'next/router'
import { NavItemType } from './Header'
import Link from 'next/link'
import ExtLink from '../ext-link'

export const NavItems = ({ navItems }: { navItems: NavItemType[] }) => {
	const router = useRouter()
	const pathname = router.pathname

	return (
		<>
			{navItems.map(({ label, page, link }) => {
				const isHome = page === navItems[0].page
				const isCurrentPage = isHome
					? pathname === '/'
					: pathname.includes(page)

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
		</>
	)
}
