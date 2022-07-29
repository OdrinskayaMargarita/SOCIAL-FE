import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

const Title = ({ children }) => (
	<Grid item>
		<Typography variant="h2">{children}</Typography>
	</Grid>
);

const Action = ({ children }) => <Grid item>{children}</Grid>;

const SectionHeader = ({ children }) => (
	<Grid container alignItems="center" justifyContent="space-between">
		{children}
	</Grid>
);

SectionHeader.Title = Title;
SectionHeader.Action = Action;

export default SectionHeader;
