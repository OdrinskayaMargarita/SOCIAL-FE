import React from "react";
import { node, oneOf } from "prop-types";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const IconButton = styled.div`
	padding: 0;
	margin: 0;
	display: flex;
	align-items: center;
	&:not(:last-child) {
		margin-right: 15px;
	}
	border: none;
	background: none;
	font-weight: 600;
	font-size: ${(props) => props.fontSize || "13px"};
	color: #748893;
	cursor: pointer;
	span {
		margin-left: 4px;
		display: inline-block;
	}
`;

const FeedFooterAction = ({ icon, color, children, ...props }) => (
	<IconButton {...props}>{children}</IconButton>
);

FeedFooterAction.proTypes = {
	children: node.isRequired,
};

export default FeedFooterAction;
