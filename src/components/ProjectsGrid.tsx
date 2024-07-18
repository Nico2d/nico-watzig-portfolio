import { useEffect, useState } from 'react'
import { getNotionPrivImage } from '../lib/notion/utils'
import { ProjectItem } from './ProjectItem'

export const ProjectsGrid = ({ posts }) => {
	const [columnsData, setColumnsData] = useState([posts])

	useEffect(() => {
		const getRecommendedNumberOfColumns = () => {
			const width = window.innerWidth

			if (width < 768) {
				return 1
			} else if (width < 1280) {
				return 2
			} else if (width < 1920) {
				return 3
			} else {
				return 4
			}
		}

		const updateColumnsData = () => {
			setColumnsData(
				splitListIntoColumns(posts, getRecommendedNumberOfColumns())
			)
		}

		updateColumnsData()
		window.addEventListener('resize', updateColumnsData)

		return () => window.removeEventListener('resize', updateColumnsData)
	}, [posts])

	return (
		<div className="flex flex-row gap-5">
			{columnsData.map((column, idx) => (
				<div key={`column-${idx}`} className="flex flex-col gap-5">
					{column.map((post) => (
						<ProjectItem
							key={post.id}
							title={post.Name}
							description={post.Summary}
							stack={post.Technology?.split(',')}
							thumbnail={getNotionPrivImage(
								post.Thumbnail,
								post.id,
								500
							)}
							slug={post.Slug}
						/>
					))}
				</div>
			))}
		</div>
	)
}

function splitListIntoColumns(list, numColumns) {
	const columns = []
	for (let i = 0; i < numColumns; i++) {
		columns.push([])
	}

	for (let i = 0; i < list.length; i++) {
		const columnIndex = i % numColumns
		columns[columnIndex].push(list[i])
	}

	return columns
}
