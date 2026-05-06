import fetch, { Response } from 'node-fetch'
import { API_ENDPOINT, NOTION_TOKEN } from './server-constants'
import { IPageChunk } from '../../types/notion.types'

export default async function rpc<T>(fnName: string, body: any): Promise<T> {
	if (!NOTION_TOKEN) {
		throw new Error('NOTION_TOKEN is not set in env')
	}
	const res = await fetch(`${API_ENDPOINT}/${fnName}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			cookie: `token_v2=${NOTION_TOKEN}`,
		},
		body: JSON.stringify(body),
	})

	if (res.ok) {
		const data = await res.json()
		return normalizeRecordMap(data) as T
	} else {
		throw new Error(await getError(res))
	}
}

// Notion's private API started wrapping recordMap entries in an extra
// `{ spaceId, value: { value, role } }` envelope. Older code in this repo
// expects the legacy `{ value, role }` shape, so unwrap it here.
function normalizeRecordMap(data: any): any {
	const recordMap = data?.recordMap
	if (!recordMap || typeof recordMap !== 'object') return data

	for (const tableName of Object.keys(recordMap)) {
		const table = recordMap[tableName]
		if (!table || typeof table !== 'object') continue
		for (const id of Object.keys(table)) {
			const entry = table[id]
			// New envelope: `{ [spaceId?], value: { value, role } }` — unwrap once.
			if (
				entry &&
				typeof entry === 'object' &&
				entry.value &&
				typeof entry.value === 'object' &&
				'value' in entry.value &&
				'role' in entry.value
			) {
				table[id] = entry.value
			}
		}
	}
	return data
}

export async function getError(res: Response) {
	return `Notion API error (${res.status}) \n${getJSONHeaders(
		res
	)}\n ${await getBodyOrNull(res)}`
}

export function getJSONHeaders(res: Response) {
	return JSON.stringify(res.headers.raw())
}

export function getBodyOrNull(res: Response) {
	try {
		return res.text()
	} catch (err) {
		return null
	}
}

export function values(obj: any) {
	const vals: any = []

	Object.keys(obj).forEach((key) => {
		vals.push(obj[key])
	})
	return vals
}
