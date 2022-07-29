import React from "react";
import { node } from "prop-types";

const HeaderContainer = ({ children }) => (
	<div className="container layout-container">
		<div className="row align-items-center">{children}</div>
	</div>
);

HeaderContainer.propTypes = {
	children: node.isRequired,
};

export default HeaderContainer;
