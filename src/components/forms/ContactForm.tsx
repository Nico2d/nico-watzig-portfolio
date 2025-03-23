import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import contactInfo from '@/constants/contact-info.json'

type FormData = {
	name: string
	email: string
	message: string
}

export const ContactForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>()

	const [success, setSuccess] = useState(false)

	const onSubmit = async (data: FormData) => {
		try {
			fetch('/api/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: data.email,
					message: data.message,
					name: data.name,
				}),
			})

			setSuccess(true)
			reset()
		} catch (error) {
			console.error('Error sending message:', error)
		}
	}

	return (
		<div className="max-w-6xl w-full grid md:grid-cols-2 gap-24 bg-surface rounded-lg shadow-lg m-auto p-6 mb-6 lg:p-24">
			<div className="space-y-4">
				<div className="border-gray-700 border-b pb-4 space-y-3 mb-12">
					<h2 className="text-3xl font-bold  ">Get in Touch</h2>
					<p className="tracking-wide text-sm">
						Let's connect! Whether it's a collaboration or a quick
						question, I'm just a message away.
					</p>
				</div>

				<div className="flex items-center gap-4 ">
					<FaMapMarkerAlt className="text-gray-400" />
					<p className="text-gray-300">{contactInfo.location}</p>
				</div>
				<div className="flex items-center gap-4">
					<FaEnvelope className="text-gray-400" />
					<p className="text-gray-300">
						<a
							href={`mailto:${contactInfo.mail}`}
							className="text-blue-400 hover:underline"
						>
							{contactInfo.mail}
						</a>
					</p>
				</div>
				<div className="flex items-center gap-4">
					<FaPhone className="text-gray-400" />
					<p className="text-gray-300">
						<a
							href={`tel:${contactInfo.phone.trim()}`}
							className="text-blue-400 hover:underline"
						>
							{contactInfo.phone}
						</a>
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{success && (
					<p className="text-green-400 font-semibold">
						✅ Message sent successfully!
					</p>
				)}

				<input
					{...register('name', { required: true })}
					placeholder="Your Name"
					className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
				{errors.name && (
					<p className="text-red-500 text-sm">Name is required</p>
				)}

				<input
					type="email"
					{...register('email', { required: true })}
					placeholder="Your Email"
					className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
				{errors.email && (
					<p className="text-red-500 text-sm">Email is required</p>
				)}

				<textarea
					{...register('message', { required: true })}
					placeholder="Your Message"
					rows={4}
					className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
				></textarea>
				{errors.message && (
					<p className="text-red-500 text-sm">Message is required</p>
				)}

				<button
					type="submit"
					className="w-full bg-primary hover:bg-primary-focused text-white font-bold py-3 rounded transition"
				>
					Send Message
				</button>
			</form>
		</div>
	)
}
