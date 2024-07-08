import { useRef } from 'react'
import { LazyMotion, domAnimation, useInView } from 'framer-motion'
import { TimeLine } from './TimeLine'
import { HeadingDivider } from '../../HeadingDivider'
import Link from 'next/link'

export function AboutSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })

	return (
		<LazyMotion features={domAnimation}>
			<section id="about" className="section">
				<HeadingDivider title="About me" />
				<div className="pt-10 max-w-5xl flex flex-col gap-3">
					<div
						tabIndex={0}
						ref={ref}
						className="text-xl font-light leading-relaxed space-y-8"
						style={{
							transform: isInView ? 'none' : 'translateX(-200px)',
							opacity: isInView ? 1 : 0,
							transition:
								'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
						}}
					>
						<p>
							I am a passionate and dedicated software developer
							with a Master's degree in Computer Science from the
							Opole University of Technology. My journey in the
							tech industry began with a six-month internship at
							Axabee, where I had my first exposure to React and
							WordPress. During this internship, I worked in a
							team of junior developers to create a{' '}
							<StyledLink project="axabee">
								company website
							</StyledLink>{' '}
							using JAMstack principles, resulting in a highly
							SEO-optimized static site.
						</p>

						<div>
							<p>
								Throughout my career, I have collaborated with
								various clients, delivering custom modifications
								primarily for WordPress sites. Some of my
								notable projects include:
							</p>
							<ul className="list-disc ml-8 mt-1 space-y-3">
								<li>
									Developing a post generator for a local
									cemetery, which creates posts about deceased
									individuals from an Excel file to identify
									their location in the cemetery.
								</li>
								<li>
									Creating an{' '}
									<StyledLink project="inteligentne-reklamy">
										interactive map
									</StyledLink>{' '}
									for a local advertising company, allowing
									users to add advertising spots to their cart
									and plan their campaigns, complete with
									Google Calendar and email notifications.
								</li>
								<li>
									Building a{' '}
									<StyledLink project="prime-garage">
										garage designer tool
									</StyledLink>{' '}
									that provides real-time updates and pricing
									based on client specifications.
								</li>
							</ul>
						</div>

						<p>
							In 2021, I joined Better Software Group, where I
							worked on large-scale projects such as Better Media
							Suite (BMS), a comprehensive service available on
							all platforms. My contributions included{' '}
							<StyledLink project="the-better">web</StyledLink>{' '}
							and <StyledLink project="bms-roku">Roku</StyledLink>{' '}
							platform development, where I honed my skills in
							application architecture and OTT platforms. I also
							played a significant role in maintaining{' '}
							<StyledLink project="siriusxm">SiriusXM</StyledLink>
							,{' '}
							<StyledLink project="disc-golf-network">
								Disc Golf Network
							</StyledLink>
							, <StyledLink project="fanmio">Fanmio</StyledLink>{' '}
							and PlayKids+.
						</p>
						<p>
							Through these experiences, I have become proficient
							in various technologies and platforms, including
							React, TypeScript, BrightScript, and OTT streaming.
							I am known for my ability to tackle complex projects
							and deliver high-quality solutions. My passion for
							continuous learning and problem-solving drives me to
							seek new challenges and opportunities for growth.
						</p>
					</div>
				</div>
			</section>
		</LazyMotion>
	)
}

const StyledLink = ({ project, children }) => {
	return (
		<Link className="custom-link" href={`/projects/${project}`}>
			{children}
		</Link>
	)
}
