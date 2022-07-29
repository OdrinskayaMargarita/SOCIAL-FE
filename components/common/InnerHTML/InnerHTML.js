import React from "react";
import styled from "@emotion/styled";

const InnerHTML = ({ Component = "div", className = "", children }) => {
	const StyledComponent = styled(Component)`
		img:first-of-type {
			max-width: 100%;
			object-fit: contain;
		}
	`;
	return <StyledComponent className={className} dangerouslySetInnerHTML={{ __html: children }} />;
};

export default InnerHTML;
