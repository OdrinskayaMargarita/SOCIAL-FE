import React from "react";
import Typography from "@mui/material/Typography";

export const SolutionHeader = ({ content }) => {
	const { name, description } = content;

	return (
		<>
			<Typography variant="h2">{name}</Typography>
			<Typography my={2} paragraph>
				{description}
			</Typography>
		</>
	);
};
