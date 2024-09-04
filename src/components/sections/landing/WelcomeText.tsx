import { TypeAnimation } from 'react-type-animation'
import { WELCOME } from '../../../constants/welcome'

export const WelcomeText = () => {
	return (
		<div className="relative lg:w-1/4 h-1/4 lg:h-full bg-black left-section">
			<div className="absolute bg-primary h-[200px] top-[100px] left-[100px] welcome-text z-10 whitespace-nowrap">
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
					className={'whitespace-nowrap'}
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
