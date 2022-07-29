import React from "react";
import { node } from "prop-types";

import { Layout } from "components";

const SmartLayout = ({ children }) => {
	return (
		<Layout>
			<>{children}</>
		</Layout>
	);
};

SmartLayout.propTypes = {
	children: node.isRequired,
};

export default SmartLayout;
