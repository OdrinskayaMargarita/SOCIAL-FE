import React from "react";

import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

const CheckDiv = styled.div`
	margin-right: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #26c03f;
	width: 48px;
	height: 48px;
	border-radius: 50%;
	color: #fff;
`;

const ContainerSuccessSolution = styled.div`
	padding: 20px;
	background: rgba(38, 192, 63, 0.12);
	margin-left: -20px;
	width: calc(100% + 40px);
	margin-top: 30px;
`;

export const SuccessSolution = (solution) => {
	const {
		content: { solutions },
		id,
	} = solution;

	const winnerSolution = solutions.find((sol) => sol.isWinner);
	const { translation } = useSelector((state) => state.app);

	return (
		<ContainerSuccessSolution>
			<Grid container>
				<CheckDiv>
					<CheckIcon />
				</CheckDiv>
				<Box>
					<Typography
						sx={{ color: "#26c03f", fontWeight: "600", fontSize: "13px" }}
						mb={1.5}
						color="primary.success"
					>
						{translation?.["solution.details.decision_made"]}
					</Typography>
					<Typography variant="h3">{winnerSolution?.name}</Typography>
				</Box>
			</Grid>
		</ContainerSuccessSolution>
	);
};
