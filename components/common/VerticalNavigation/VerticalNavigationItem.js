import React from "react";
import { bool, node } from "prop-types";

const VerticalNavigationItem = ({ isActive = false, disabled, children, ...props }) => {
	return <div {...props}>{children}</div>;
};

VerticalNavigationItem.propTypes = {
	isActive: bool,
	disabled: bool,
	children: node.isRequired,
};

export default VerticalNavigationItem;
