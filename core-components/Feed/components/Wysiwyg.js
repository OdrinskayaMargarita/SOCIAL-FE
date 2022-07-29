import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

import InnerHTML from "../../../components/common/InnerHTML";

const Wrapper = styled.div`
	margin-top: 20px;
`;

const FeedWysiwyg = ({ children }) => (
	<Wrapper>
		<InnerHTML Component={Typography}>{children}</InnerHTML>
	</Wrapper>
);

export default FeedWysiwyg;
