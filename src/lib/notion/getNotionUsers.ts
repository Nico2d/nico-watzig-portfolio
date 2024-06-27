import { INotionUsers, IResultUsers } from '../../types/notion.types'
import rpc from './rpc'

export default async function getNotionUsers(ids: string[]) {
	const { results = [] }: INotionUsers = await rpc<INotionUsers>(
		'getRecordValues',
		{
			requests: ids.map((id: string) => ({
				id,
				table: 'notion_user',
			})),
		}
	)

	const users: any = {}

	for (const result of results) {
		const { value } = result || ({ value: {} } as IResultUsers)
		const { given_name, family_name } = value
		let full_name = given_name || ''

		if (family_name) {
			full_name = `${full_name} ${family_name}`
		}
		users[value.id] = { full_name }
	}

	return { users }
}
