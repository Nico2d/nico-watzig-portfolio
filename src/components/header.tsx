import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import { ContactIcons } from './contactIcons'

const navItems: { label: string; page?: string; link?: string }[] = [
	{ label: 'Home', page: '/' },
	{ label: 'Projects', page: '/projects' },
	{ label: 'Contact', page: '/contact' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

export const Header = ({ titlePre = '' }) => {
	const { pathname } = useRouter()

	return (
		<header>
			<Head>
				<title>Nico Wätzig - Portfolio</title>
				<meta
					name="description"
					content="An example Next.js site using Notion for the blog"
				/>
				<meta name="og:title" content="My Notion Blog" />
				<meta property="og:image" content={ogImageUrl} />
				<meta name="twitter:site" content="@_ijjk" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:image" content={ogImageUrl} />
			</Head>

			<nav className="flex flex-1 flex-row justify-between items-center">
				<ContactIcons size={24} />

				<ul className="flex flex-1 flex-row uppercase justify-end py-8 gap-10 tracking-widest">
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
