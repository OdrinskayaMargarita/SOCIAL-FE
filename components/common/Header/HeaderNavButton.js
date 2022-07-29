import React from "react";
import Button from "../Button";

const HeaderNavButton = ({ className = "", children, ...properties }) => (
	<Button {...properties}>{children}</Button>
);

HeaderNavButton.propTypes = {
	...Button.propTypes,
};

export default HeaderNavButton;
