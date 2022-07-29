import React from "react";
import { string } from "prop-types";

const VerticalNavigationItemIcon = ({ name, className = "", ...props }) => (
	// <Icon
	// 	name={name}
	// 	{...props}
	// />
	<></>
);

VerticalNavigationItemIcon.propTypes = {
	name: string.isRequired,
	className: string,
};

export default VerticalNavigationItemIcon;
