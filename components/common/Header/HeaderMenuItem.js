import React from "react";
import { bool, node, string } from "prop-types";

const HeaderMenuItem = ({ name, path = "", disabled = false, alt = "", children }) => {
	const active = name && path && path.includes(name);

	return (
		<div>
			{children}
			{/* {alt ? <span className={style["header-menu-item-alt"]}>{alt}</span> : null} */}
		</div>
	);
};

HeaderMenuItem.propTypes = {
	name: string,
	path: string,
	alt: string,
	disabled: bool,
	children: node,
};

export default HeaderMenuItem;
