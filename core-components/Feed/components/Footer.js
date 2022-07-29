import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import React from "react";

const Footer = styled.div`
	margin-top: 20px;
`;

const FeedFooterCol = ({ children }) => (
	<Grid item justifyContent="center" display="flex">
		{children}
	</Grid>
);

const FeedFooterColAuto = ({ children }) => <Grid item>{children}</Grid>;

const FeedFooter = ({ children }) => (
	<Footer>
		<Grid container alignItems="center" justifyContent="space-between">
			{children}
		</Grid>
	</Footer>
);

FeedFooter.Col = FeedFooterCol;
FeedFooter.ColAuto = FeedFooterColAuto;

export default FeedFooter;
