export interface IRecordMap {
	block: IBlock
	collection: object
	collection_view: object
	space: object
}

export interface INotionComponent {
	block: IBlock
}

export interface IBlock {
	role?: string
	value: {
		alive: boolean
		created_by_id: string
		created_by_table: string
		created_time: number
		file_ids: string[]
		format?: {
			block_aspect_ratio: number
			block_full_width: boolean
			block_height: number
			block_page_width: true
			block_preserve_scale: true
			block_width: number
			display_source: string
			bookmark_icon?: string
			bookmark_cover?: string
			page_icon?: string
		}
		id: string
		last_edited_by_id: string
		last_edited_by_table: string
		last_edited_time: number
		parent_id: string
		parent_table: string
		properties: {
			size?: string[]
			source?: string[]
			title?: string[]
			description?: string[]
			link?: string[]
			language?: string[]
			html?: string
			checked?: string[]
		}
		space_id: string
		type: string
		version: number
		listCollection?: IBlock[]
	}
}

export interface IPageChunk {
	cursor: {
		stack: object[]
	}
	recordMap: IRecordMap
}

export interface INotionAsset {
	signedUrls: string[]
}

export interface IResultUsers {
	value: {
		given_name: string
		family_name: string
		id: string
	}
}

export interface INotionUsers {
	results: IResultUsers[]
}

export interface IQueryCollection {
	allBlockIds: string[]
	collectionsIds: string[]
	isViewSpecificClientMode: boolean
	recordMap: IRecordMap
	result: object
	shouldUseClientMode: boolean
}
