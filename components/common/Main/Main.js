import React from "react";
import { node } from "prop-types";

const Main = ({ children }) => <main>{children}</main>;

Main.propTypes = {
	children: node.isRequired,
};

export default Main;
