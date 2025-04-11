import { WELCOME } from '@/constants/welcome'
import { TypeAnimation } from 'react-type-animation'

export const HelloTextAnimation = () => {
	return (
		<div className="absolute top-[100px]">
			<div className="bg-landing-unlock-primary text-white h-[200px] welcome-text z-50 px-12 w-min">
				<TypeAnimation
					sequence={addSeparator(WELCOME, 1000)}
					wrapper="h2"
					speed={5}
					cursor={true}
					style={{
						fontSize: '8rem',
						display: 'inline-block',
					}}
					repeat={Infinity}
					className="whitespace-nowrap"
				/>
			</div>
		</div>
	)
}

const addSeparator = (arr, separator) => {
	return arr.reduce((acc, curr) => {
		return [...acc, curr, separator]
	}, [])
}
