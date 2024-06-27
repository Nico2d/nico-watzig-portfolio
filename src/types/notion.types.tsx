export interface IRecordMap {
	block: object
	collection: object
	collection_view: object
	space: object
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
