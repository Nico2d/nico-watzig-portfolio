import { INotionComponent } from "../../../types/notion.types";

export const NotionCheckbox = ({ block }: INotionComponent) => {
    const { properties } = block.value;
    const isChecked = properties?.checked?.[0][0] === "Yes";

    return (
        <label className="flex items-center space-x-3">
            <input
                type="checkbox"
                className="relative appearance-none h-5 w-5 border border-gray-600 rounded-md bg-gray-800 checked:bg-blue-500 checked:border-transparent focus:outline-none transition duration-200"
                readOnly
                checked={isChecked}
            />
            <span className="absolute left-[6px] top-[2px] h-[12px] w-[6px] rotate-45 border-b-2 border-r-2 border-white opacity-0 peer-checked:opacity-100" />
            <span className="text-gray-300">{properties?.title?.[0][0]}</span>
        </label>
    );
};
