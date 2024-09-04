import { useRef } from 'react'
import { Header } from '../components/header'
import { AboutSection } from '../components/sections/about'
import { WelcomeSection } from '../components/sections/introduction'
import { TechnologiesSection } from '../components/sections/technologies'
import Landing from './landing'

export default function Index() {
	const sectionFocusRef = useRef(null)

	return (
		<>
			<Landing />

			<div className="container-md space-y-8 ">
				<Header titlePre="Home" />
				<WelcomeSection redirectRef={sectionFocusRef} />
				<AboutSection />
				<TechnologiesSection />
			</div>
		</>
	)
}
