import { getNotionPrivImage } from '../utils'

export const renderImage = ({ value }) => {
	const { properties } = value

	const isLocal = properties.title ? true : false

	let imageUrl = isLocal
		? getNotionPrivImage(properties.source[0], value.id)
		: properties.source[0]

	return <img key={value.id} src={imageUrl} />
}
