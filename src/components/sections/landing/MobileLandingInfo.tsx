import { ContactIcons } from '@/components/ui/ContactIcons'

export const MobileLandingInfo = () => {
	return (
		<div className="flex lg:hidden bottom-section justify-between container-md items-center">
			<div className="mt-[6vh]">
				<p className="text-base">Hi, I am</p>
				<p className="text-3xl font-bold">Nico Wätzig</p>
				<p className="text-xs font-extrabold tracking-widest">
					Frontend Developer
				</p>
			</div>

			<ContactIcons className="flex-col" />
		</div>
	)
}
