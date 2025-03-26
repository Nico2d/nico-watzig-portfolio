import Link from "next/link";

export const ExternalLink = (props) => (
    <Link {...props} rel="noopener" target={props.target || "_blank"} />
);
