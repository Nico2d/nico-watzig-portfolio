import { useRef } from 'react'
import { Header } from '../components/header'
import { AboutSection } from '../components/sections/about'
import { WelcomeSection } from '../components/sections/introduction'
import { TechnologiesSection } from '../components/sections/technologies'
import Landing from './landing'

export default function Index() {
	return (
		<>
			<Landing />

			<div className="container-md space-y-8 ">
				<Header titlePre="Home" />
				<WelcomeSection />
				<AboutSection />
				<TechnologiesSection />
			</div>
		</>
	)
}
