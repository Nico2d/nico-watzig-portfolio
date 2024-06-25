import Link from 'next/link'

const ExtLink = (props) => (
  <Link {...props} rel="noopener" target={props.target || '_blank'} />
)
export default ExtLink
