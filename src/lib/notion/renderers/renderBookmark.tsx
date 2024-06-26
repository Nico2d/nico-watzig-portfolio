import Link from 'next/link'
import blogStyles from '../../../styles/blog.module.css'

export const renderBookmark = ({ link, title, description, format }) => {
  const { bookmark_icon: icon, bookmark_cover: cover } = format

  return (
    <div className={blogStyles.bookmark}>
      <div>
        <div style={{ display: 'flex' }}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className={blogStyles.bookmarkContentsWrapper}
            href={link}
          >
            <div role="button" className={blogStyles.bookmarkContents}>
              <div className={blogStyles.bookmarkInfo}>
                <div className={blogStyles.bookmarkTitle}>{title}</div>
                <div className={blogStyles.bookmarkDescription}>
                  {description}
                </div>
                <div className={blogStyles.bookmarkLinkWrapper}>
                  <img src={icon} className={blogStyles.bookmarkLinkIcon} />
                  <div className={blogStyles.bookmarkLink}>{link}</div>
                </div>
              </div>
              <div className={blogStyles.bookmarkCoverWrapper1}>
                <div className={blogStyles.bookmarkCoverWrapper2}>
                  <div className={blogStyles.bookmarkCoverWrapper3}>
                    <img src={cover} className={blogStyles.bookmarkCover} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
