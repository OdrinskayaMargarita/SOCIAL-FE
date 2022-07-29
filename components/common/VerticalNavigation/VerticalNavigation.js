import React from "react";
import { node } from "prop-types";

const VerticalNavigation = ({ children, ...props }) => <div {...props}>{children}</div>;

VerticalNavigation.propTypes = {
	children: node.isRequired,
};

export default VerticalNavigation;
