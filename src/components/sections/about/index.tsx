import { useRef } from 'react'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'
import { TimeLine } from './TimeLine'
import { HeadingDivider } from '../../HeadingDivider'

export function AboutSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })

	return (
		<LazyMotion features={domAnimation}>
			<section id="about" className="section">
				<HeadingDivider title="About me" />
				<div className="pt-10 pb-16 max-w-5xl flex flex-col gap-3">
					<div
						tabIndex={0}
						ref={ref}
						className="text-xl font-light leading-relaxed"
						style={{
							transform: isInView ? 'none' : 'translateX(-200px)',
							opacity: isInView ? 1 : 0,
							transition:
								'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
						}}
					>
						<p>
							My name is Nico Wätzig. I have over four years of
							commercial experience, most recently working at BSG,
							which was acquired by Spyrosoft. Due to the changes
							that occurred after the acquisition, I am seeking a
							new position.
						</p>

						<p className="my-3.5">
							At BSG, I was responsible for developing OTT
							applications for the web and other platforms using
							React, as well as for Roku devices. I have extensive
							knowledge in the media field, including players,
							streaming, and content playback technologies.
						</p>

						<p className="my-3.5">
							I also worked as a Freelancer, completing various
							projects for smaller companies, such as a 3D carport
							designer and a generator for deceased persons' posts
							based on Excel data for a cemetery.
						</p>

						<p className="my-3.5">
							I am currently seeking a new challenge that will
							allow me to leverage my skills in a dynamic
							environment and continue growing as a Frontend
							Developer. I believe that my experience and passion
							for technology can bring value to your team.
						</p>
					</div>
				</div>

				<TimeLine />
			</section>
		</LazyMotion>
	)
}
