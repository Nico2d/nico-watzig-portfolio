interface IFooterProps {
	isHidden?: boolean
}

export const Footer = ({ isHidden = false }: IFooterProps) => {
	return (
		<footer
			className={`w-full border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm text-gray-600 dark:text-gray-400 ${
				isHidden ? 'lg:hidden' : 'lg:block'
			}`}
		>
			© {new Date().getFullYear()} Nico Wätzig. All rights reserved.
		</footer>
	)
}
