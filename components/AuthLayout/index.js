import React from "react";
import { node } from "prop-types";

const AuthLayout = ({ children }) => <>{children}</>;

AuthLayout.propTypes = {
	children: node.isRequired,
};

export default AuthLayout;
