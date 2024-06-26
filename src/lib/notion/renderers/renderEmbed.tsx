import { CSSProperties } from 'react'

export const renderEmbed = (block) => {
  const { value } = block
  const { type, id } = value

  const { format = {} } = value
  const {
    block_width,
    block_height,
    display_source,
    block_aspect_ratio,
  } = format
  const baseBlockWidth = 768
  const roundFactor = Math.pow(10, 2)

  const width = block_width
    ? `${
        Math.round((block_width / baseBlockWidth) * 100 * roundFactor) /
        roundFactor
      }%`
    : block_height || '100%'

  const isImage = type === 'image'
  const Comp = isImage ? 'img' : 'video'
  const useWrapper = block_aspect_ratio && !block_height
  const childStyle: CSSProperties = useWrapper
    ? {
        width: '100%',
        height: '100%',
        border: 'none',
        position: 'absolute',
        top: 0,
      }
    : {
        width,
        border: 'none',
        height: block_height,
        display: 'block',
        maxWidth: '100%',
      }

  let child = null

  if (!isImage && !value.file_ids) {
    // external resource use iframe
    child = (
      <iframe
        style={childStyle}
        src={display_source}
        key={!useWrapper ? id : undefined}
        className={!useWrapper ? 'asset-wrapper' : undefined}
      />
    )
  } else {
    // notion resource
    child = (
      <Comp
        key={!useWrapper ? id : undefined}
        src={`/api/asset?assetUrl=${encodeURIComponent(
          display_source as any
        )}&blockId=${id}`}
        controls={!isImage}
        alt={`An ${isImage ? 'image' : 'video'} from Notion`}
        loop={!isImage}
        muted={!isImage}
        autoPlay={!isImage}
        style={childStyle}
      />
    )
  }

  return useWrapper ? (
    <div
      style={{
        paddingTop: `${Math.round(block_aspect_ratio * 100)}%`,
        position: 'relative',
      }}
      className="asset-wrapper"
      key={id}
    >
      {child}
    </div>
  ) : (
    child
  )
}
