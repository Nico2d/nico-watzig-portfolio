import { INotionComponent } from '../../../types/notion.types'

export const NotionCheckbox = ({ block }: INotionComponent) => {
	const { properties } = block.value
	const isChecked = properties?.checked?.[0][0] === 'Yes'

	return (
		<div>
			<label className="flex items-center space-x-3">
				<input
					type="checkbox"
					className="custom-checkbox"
					readOnly
					checked={isChecked}
				/>
				<span className="text-gray-300">{properties?.title?.[0][0]}</span>
			</label>
		</div>
	)
}
