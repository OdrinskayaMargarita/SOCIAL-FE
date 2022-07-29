import React from "react";
import { bool, node, string } from "prop-types";
import Box from "@mui/material/Box";

const SectionItem = ({
	className = "",
	isPaddingXNone = false,
	isBorderNone = false,
	fullHeight = false,
	children,
}) => (
	<Box p={[1.5, 2.5]} borderBottom={isBorderNone ? 0 : 1} borderColor="divider">
		{children}
	</Box>
);

SectionItem.propTypes = {
	className: string,
	isPaddingXNone: bool,
	isBorderNone: bool,
	fullHeight: bool,
	children: node.isRequired,
};

export default SectionItem;
