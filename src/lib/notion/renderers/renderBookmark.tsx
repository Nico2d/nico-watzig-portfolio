import Link from 'next/link'

export const renderBookmark = (block) => {
	const { link, title, description } = block.value.properties
	const { bookmark_icon: icon, bookmark_cover: cover } = block.value.format

	return (
		<div>
			<div style={{ display: 'flex' }}>
				<Link
					target="_blank"
					rel="noopener noreferrer"
					className={'bookmarkContentsWrapper'}
					href={link}
				>
					<div role="button" className={'bookmarkContents'}>
						<div className={'bookmarkInfo'}>
							<div className={'bookmarkTitle'}>{title}</div>
							<div className={'bookmarkDescription'}>
								{description}
							</div>
							<div className={'bookmarkLinkWrapper'}>
								<img
									src={icon}
									className={'bookmarkLinkIcon'}
								/>
								<div className={'bookmarkLink'}>{link}</div>
							</div>
						</div>
						<div className={'bookmarkCoverWrapper1'}>
							<div className={'bookmarkCoverWrapper2'}>
								<div className={'bookmarkCoverWrapper3'}>
									<img
										src={cover}
										className={'bookmarkCover'}
									/>
								</div>
							</div>
						</div>
					</div>
				</Link>
			</div>
		</div>
	)
}
