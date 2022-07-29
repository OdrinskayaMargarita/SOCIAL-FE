import React from "react";
import { node } from "prop-types";

const HeaderMenu = ({ children }) => <div>{children}</div>;

HeaderMenu.propTypes = {
	children: node.isRequired,
};

export default HeaderMenu;
