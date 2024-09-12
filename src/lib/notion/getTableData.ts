import { values } from './rpc'
import queryCollection from './queryCollection'
import { IBlock, INotionProject } from '../../types/notion.types'

export default async function loadTable(
	collection_id: string,
	view_id: string,
	isPosts = false
): Promise<INotionProject[]> {
	let table: any = {}
	const collectionData = await queryCollection({
		collectionId: collection_id,
		collectionViewId: view_id,
	})
	const entries = values(collectionData.recordMap.block).filter(
		(block: IBlock) =>
			block.value && block.value.parent_id === collection_id
	)

	const colId = Object.keys(collectionData.recordMap.collection)[0]
	const schema = collectionData.recordMap.collection[colId].value.schema
	const schemaKeys = Object.keys(schema)

	for (const entry of entries) {
		const props = entry.value && entry.value.properties
		const row: any = {}

		if (!props) continue
		if (entry.value.content) {
			row.id = entry.value.id
		}

		schemaKeys.forEach((key) => {
			// might be undefined
			let val = props[key] && props[key][0][0]

			// authors and blocks are centralized
			if (val && props[key][0][1]) {
				const type = props[key][0][1][0]

				switch (type[0]) {
					case 'a': // link
						val = type[1]
						break
					case 'u': // user
						val = props[key]
							.filter((arr: any[]) => arr.length > 1)
							.map((arr: any[]) => arr[1][0][1])
						break
					case 'p': // page (block)
						const page = collectionData.recordMap.block[type[1]]
						if (page) {
							row.id = page.value.id
							val = page.value.properties.title[0][0]
						}
						break
					case 'd': // date
						// start_date: 2019-06-18
						// start_time: 07:00
						// time_zone: Europe/Berlin, America/Los_Angeles

						if (!type[1].start_date) {
							break
						}
						// initial with provided date
						const providedDate = new Date(
							type[1].start_date +
								' ' +
								(type[1].start_time || '')
						).getTime()

						// calculate offset from provided time zone
						const timezoneOffset =
							new Date(
								new Date().toLocaleString('en-US', {
									timeZone: type[1].time_zone,
								})
							).getTime() - new Date().getTime()

						// initialize subtracting time zone offset
						val = new Date(providedDate - timezoneOffset).getTime()
						break
					default:
						console.error('unknown type', type[0], type)
						break
				}
			}

			if (typeof val === 'string') {
				val = val.trim()
			}
			row[schema[key].name] = val || null
		})

		if (!row.Slug) {
			// console.log(`missing "Slug" field for ${row.Name}`)
		}

		const key = row.id
		if (isPosts && !key) continue

		row['lastModified'] = entry.value.last_edited_time

		if (key) {
			table[key] = row
		} else {
			if (!Array.isArray(table)) table = []
			table.push(row)
		}
	}

	return table
}
