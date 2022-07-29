import React from "react";
import { node } from "prop-types";

const HeaderNav = ({ children }) => <div>{children}</div>;

HeaderNav.propTypes = {
	children: node.isRequired,
};

export default HeaderNav;
