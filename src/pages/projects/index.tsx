import { useState } from 'react'
import { Header } from '@/components/header'
import { ProjectsGrid } from '@/components/ui/ProjectsGrid'
import { Filter } from '@/components/ui/Filter'
import { getProjects } from '@/lib/notion/getProjects'
import Head from 'next/head'
import openGraphImage from '@images/Opengraph-image.png'
import { INotionProject } from '@/types/notion.types'

export async function getStaticProps({ preview }) {
	const posts: any[] = await getProjects()

	return {
		props: {
			preview: preview || false,
			posts,
		},
		revalidate: 10,
	}
}

interface IIndexProps {
	posts: INotionProject[]
}

const Index = ({ posts = [] }: IIndexProps) => {
	const [filteredPosts, setFilteredPosts] = useState<INotionProject[]>(posts)

	const filterProjects = (filter) => {
		if (filter === 'all') {
			setFilteredPosts(posts)
		} else {
			setFilteredPosts(
				posts.filter((item: INotionProject) => {
					const technologies = item.Technology?.split(',') ?? []

					return technologies
						.map((item) => item.toLowerCase())
						.includes(filter.toLowerCase())
				})
			)
		}
	}

	return (
		<>
			<Head>
				<title>Projects | Nico Wätzig</title>
				<meta
					name="description"
					content="Welcome to my website, where you may discover information about me, the technologies and projects on which I work."
					key="desc"
				/>
				<meta property="og:title" content="Projects | Nico Wätzig" />
				<meta
					property="og:description"
					content="Welcome to my website, where you may discover information about me, the technologies and projects on which I work."
				/>
				<meta property="og:image" content={openGraphImage.src} />
			</Head>

			<Header />

			<div className="container-md space-y-8 mt-48 mb-20">
				<Filter onClick={filterProjects} />

				{filteredPosts.length > 0 ? (
					<ProjectsGrid posts={filteredPosts} />
				) : (
					<p>There are no posts yet</p>
				)}
			</div>
		</>
	)
}

export default Index
