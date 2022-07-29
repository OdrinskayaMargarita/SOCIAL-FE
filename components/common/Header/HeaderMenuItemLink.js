import React from "react";
import Link from "../Link";

const HeaderMenuItemLink = ({ href, children, ...props }) => {
	return (
		<Link href={href} {...props}>
			{children}
		</Link>
	);
};

export default HeaderMenuItemLink;
