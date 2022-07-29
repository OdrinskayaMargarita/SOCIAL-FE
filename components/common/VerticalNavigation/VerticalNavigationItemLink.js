import React from "react";
import { node, string } from "prop-types";
import Link from "components/common/Link";

const VerticalNavigationItemLink = ({ href, children, ...props }) => (
	<Link href={href} {...props}>
		{children}
	</Link>
);

VerticalNavigationItemLink.propTypes = {
	href: string,
	children: node.isRequired,
};

export default VerticalNavigationItemLink;
