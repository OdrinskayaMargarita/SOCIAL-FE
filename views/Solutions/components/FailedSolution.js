import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const FailedSolution = (solution) => {
	const {
		content: { solutions },
		id,
	} = solution;
	const { translation } = useSelector((state) => state.app);

	const winnerSolution = solutions.find((sol) => sol.isWinner);

	return (
		<Box mt={2}>
			<Typography variant="h3" mb={2}>
				{translation?.["solution.details.decision_not_made.subtitle"]}
			</Typography>
			<Typography>{translation?.["solution.details.decision_not_made.description"]}</Typography>
		</Box>
	);
};
