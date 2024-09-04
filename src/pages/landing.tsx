import { useState } from 'react'
import { WELCOME } from '../constants/welcome'
import { TypeAnimation } from 'react-type-animation'
import { ParallaxFace } from '../components/ParallaxFace'
import { DiscoverButton } from '../components/DiscoverButton'

const addSeparator = (arr, separator) => {
	return arr.reduce((acc, curr) => {
		return [...acc, curr, separator]
	}, [])
}

export default function Landing() {
	const [isLandingAnimating, setIsLandingAnimating] = useState(false)

	// TODO: add focusArea instead of focusPoint
	// const [focusArea, setFocusArea] = useState([
	// 	[0, 0],
	// 	[0, 10],
	// 	[10, 0],
	// 	[10, 10],
	// ])

	return (
		<>
			<div
				className={`parallax-container h-screen flex flex-col flex-col-reverse lg:flex-row `}
			>
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

				<ParallaxFace isLocked={isLandingAnimating} />
			</div>

			<DiscoverButton
				size={80}
				onClick={() => {
					setIsLandingAnimating(!isLandingAnimating)
				}}
				isLandingAnimating={isLandingAnimating}
			/>
		</>
	)
}
