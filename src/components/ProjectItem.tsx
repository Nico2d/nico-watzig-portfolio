import { useRef } from 'react'
import { VscSourceControl } from 'react-icons/vsc'
import { FiExternalLink } from 'react-icons/fi'
import { BsArrowsFullscreen } from 'react-icons/bs'

import 'react-image-gallery/styles/css/image-gallery.css'
import ExtLink from './ext-link'
import Link from 'next/link'

export const ProjectItem = ({
  title = '',
  description = '',
  thumbnail = '',
  stack = [],
  liveUrl = '',
  repoUrl = '',
  slug,
}) => {
  const cardRef = useRef(null)

  return (
    <article
      ref={cardRef}
      className="flex flex-col rounded-lg bg-card-light dark:bg-card-dark overflow-hidden"
    >
      <figure>
        <img className="aspect-[12/9.2] w-full h-full" src={thumbnail} />
      </figure>

      <div className="flex-[2] px-5 py-6 text-center flex flex-col gap-10">
        <header className="flex-1 flex items-center justify-start flex-col gap-3">
          <h3 tabIndex={0} className="text-2xl font-bold">
            {title}
          </h3>
          <p tabIndex={0} className="leading-7 font-light">
            {description}
          </p>
        </header>

        <footer className="flex flex-col gap-10">
          {!!stack.length && (
            <div className="flex-center flex-wrap gap-3">
              {stack.map((tag) => (
                <span
                  key={tag}
                  tabIndex={0}
                  className="px-2 text-sm leading-normal rounded bg-badge-light/50 dark:bg-badge-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex-center gap-2">
            {repoUrl && (
              <ExtLink
                href={repoUrl}
                target="_blank"
                className="icon-link-btn"
                title="Go to Github repository"
              >
                <VscSourceControl />
                <span>Source</span>
              </ExtLink>
            )}
            {liveUrl && (
              <ExtLink
                href={liveUrl}
                target="_blank"
                className="icon-link-btn"
                title="Go to live address"
              >
                <FiExternalLink />
                <span>Demo</span>
              </ExtLink>
            )}

            {slug && (
              <Link href={`blog/${slug}`} className="icon-link-btn">
                <BsArrowsFullscreen />
                <span>Learn more</span>
              </Link>
            )}
          </div>
        </footer>
      </div>
    </article>
  )
}
