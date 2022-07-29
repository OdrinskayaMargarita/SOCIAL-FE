import React from "react";
import styled from "@emotion/styled";

const LinkComponent = styled.div`
	a {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		color: #000;
		text-decoration: none;
	}
	svg {
		margin-right: 20px;
	}
`;

const Link = ({ href, className = "", children, ...props }) => (
	<LinkComponent>
		<a href={href} {...props}>
			{children}
		</a>
	</LinkComponent>
);

export default Link;
