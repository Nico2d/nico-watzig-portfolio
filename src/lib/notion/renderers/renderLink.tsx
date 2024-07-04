import Link from 'next/link'

export const renderLink = ({ value }) => {
	console.log(value)

	return <Link src={'/'}>LINK</Link>
}
