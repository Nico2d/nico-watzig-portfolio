import Landscape from '../components/svgs/landscape'
import { ContactIcons } from '../components/contactIcons'
import { Header } from '../components/header'

export default function Contact() {
	return (
		<div>
			<Header titlePre="Contact" />
			<div>
				<h1 className="text-6xl bold mb-8">Contact</h1>

				<ContactIcons />

				<div className="fixed -bottom-20 -right-6 h-screen aspect-square">
					<Landscape />
				</div>
			</div>
		</div>
	)
}
