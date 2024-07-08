import ExtLink from '../../../components/ext-link'
import { INotionComponent } from '../../../types/notion.types'

export const NotionBookmark = ({ block }: INotionComponent) => {
	const {
		link: rawLink,
		title: rawTitle,
		description,
	} = block.value.properties
	const { bookmark_icon: icon, bookmark_cover: cover } = block.value
		?.format ?? {
		bookmark_icon: null,
		bookmark_cover: null,
	}

	const link = rawLink[0][0]
	const title = rawTitle || getUrlDomain(link)

	return (
		<div>
			<ExtLink href={link}>
				<div role="button" className="bookmarkContents">
					<BookmarkInfo
						title={title}
						description={description}
						link={link}
						icon={icon}
					/>
					<BookmarkCover cover={cover} />
				</div>
			</ExtLink>
		</div>
	)
}

const BookmarkIcon = ({ icon }) =>
	icon ? <img src={icon} className="bookmarkLinkIcon" /> : null

const BookmarkCover = ({ cover }) =>
	cover ? (
		<div className="bookmarkCoverWrapper1">
			<div className="bookmarkCoverWrapper2">
				<div className="bookmarkCoverWrapper3">
					<img src={cover} className="bookmarkCover" />
				</div>
			</div>
		</div>
	) : null

const BookmarkDescription = ({ description }) =>
	description ? (
		<div className="bookmarkDescription">{description}</div>
	) : null

const BookmarkLinkWrapper = ({ link, icon }) => (
	<div className="bookmarkLinkWrapper flex gap-6">
		<BookmarkIcon icon={icon} />
		<div>{link}</div>
	</div>
)

const BookmarkInfo = ({ title, description, link, icon }) => (
	<div className="bookmarkInfo">
		<div className="bookmarkTitle">{title}</div>
		<BookmarkDescription description={description} />
		<BookmarkLinkWrapper link={link} icon={icon} />
	</div>
)

const getUrlDomain = (link) => {
	const url = new URL(link)
	return url.hostname
}
