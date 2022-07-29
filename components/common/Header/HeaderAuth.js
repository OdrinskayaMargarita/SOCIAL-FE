import React from "react";
import { node } from "prop-types";

const HeaderAuth = ({ children }) => <div>{children}</div>;

HeaderAuth.propTypes = {
	children: node.isRequired,
};

export default HeaderAuth;
