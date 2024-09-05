import { ContactIcons } from '@/components/ContactIcons'
import { Header } from '@/components/header'
import Landscape from '@/components/svgs/landscape'

export default function Contact() {
	return (
		<div>
			<Header />
			<div>
				<h1 className="text-6xl bold mt-20 mb-8">Contact</h1>

				<ContactIcons />

				<div className="fixed -bottom-50 md:-bottom-20 -right-20 md:-right-6 h-screen aspect-square -z-10">
					<Landscape />
				</div>
			</div>
		</div>
	)
}
