import React from "react";
import { node, string } from "prop-types";

import Typography from "@mui/material/Typography";

const SubSectionHead = ({ className = "", children }) => {
	return (
		<>
			<Typography variant="h3" mb={2} sx={{ padding: "10px 0" }}>
				{children}
			</Typography>
		</>
	);
};

SubSectionHead.propTypes = {
	className: string,
	children: node,
};

const SubSectionBody = ({ className = "", children }) => {
	return <div className={className}>{children}</div>;
};

SubSectionBody.propTypes = {
	className: string,
	children: node.isRequired,
};

const SubSection = ({ children, className = "" }) => <div className={className}>{children}</div>;

SubSection.propTypes = {
	className: string,
	children: node.isRequired,
};

SubSection.Head = SubSectionHead;
SubSection.Body = SubSectionBody;

export default SubSection;
