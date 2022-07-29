import React from "react";
import { node } from "prop-types";

const HeaderLogo = ({ children }) => <div>{children}</div>;

HeaderLogo.propTypes = {
	children: node.isRequired,
};

export default HeaderLogo;
