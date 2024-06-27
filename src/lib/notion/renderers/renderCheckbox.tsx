export const renderCheckbox = ({ value }) => {
	const { properties } = value
	const isChecked = properties.checked?.[0][0] === 'Yes'

	return (
		<div>
			<label className="flex items-center space-x-3">
				<input
					type="checkbox"
					className="custom-checkbox"
					checked={isChecked}
				/>
				<span className="text-gray-300">Akceptuję warunki</span>
			</label>
		</div>
	)
}
