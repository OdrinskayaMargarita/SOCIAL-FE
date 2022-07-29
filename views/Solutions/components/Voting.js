import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { getSolutionData, addSolutionToVote } from "store/thunks/solutions.thunks";
import { MODAL_TYPES } from "core-components/Modal/constants";
import Avatar from "core-components/Avatar";
import { openModal } from "store/reducers/app.reducer";

import { SolutionTimer } from "./Timer";

const ContainerVoting = styled.div`
	padding-top: 20px;
	h3 {
		ont-weight: 600;
		font-size: 14px;
		line-height: 17px;
		margin-bottom: 10px;
	}
`;
const ContainerListSolution = styled.div`
	padding-top: 20px;
`;

export const Voting = (solution) => {
	const dispatch = useDispatch();
	const { translation } = useSelector((state) => state.app);
	const {
		content: { solutions, endTimestamp, isUserVote },
		id,
		author,
	} = solution;

	const [isInputActive, setIsInputActive] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const endAction = useCallback(() => dispatch(getSolutionData(id)), [dispatch]);

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const openVoting = useCallback(
		() => dispatch(openModal(MODAL_TYPES.OPEN_VOTING_MODAL)),
		[dispatch],
	);
	const sendSolution = useCallback(async () => {
		try {
			const {
				payload: { success, error },
			} = await dispatch(
				addSolutionToVote({
					id_voting: id,
					name: inputValue,
					description: "Description",
				}),
			);
			if (success) {
				dispatch(getSolutionData(id));
				setInputValue("");
				setIsInputActive(false);
			}
		} catch (e) {
			console.error(e);
		}
	});

	return (
		<ContainerVoting>
			<Typography variant="h3">{translation?.["solution.details.voting_end"]}</Typography>
			<Grid container alignItems="center" justifyContent="space-between">
				<Grid item xs={5}>
					<SolutionTimer timestamp={endTimestamp} endAction={endAction} />
				</Grid>
				<Grid item xs={7}>
					<Typography color="primary.lightblue" lineHeight="154%" paragraph>
						На этапе голосования участники ранжируют варианты в порядке своего предпочтения. После
						окончания голосования система автоматически подсчитает и опубликует результаты.
					</Typography>
				</Grid>
			</Grid>
			<ContainerListSolution>
				{isLoggedIn ? (
					<Button fullWidth onClick={openVoting}>
						{isUserVote
							? translation?.["solution_in_progress.details.change_button"]
							: translation?.["solution_in_progress.details.vote_button"]}
					</Button>
				) : null}
				<Typography variant="h3" mt={2.5} mb={2}>
					{translation?.["solution.details.suggested _options"]}
				</Typography>
				{solutions.map((singleSolution, index) => (
					<Box
						sx={{
							p: 2,
							ml: -2.5,
							borderBottom: 1,
							borderColor: "divider",
							width: "calc(100% + 40px)",
						}}
						key={index}
					>
						<Grid container justifyContent="space-between" alignItems="center">
							<Grid item xs={11}>
								<Typography>{singleSolution?.name}</Typography>
							</Grid>
							<Grid item xs={1}>
								{author?.avatar?.url && <Avatar src={author.avatar.url} alt="" />}
							</Grid>
						</Grid>
					</Box>
				))}
			</ContainerListSolution>
		</ContainerVoting>
	);
};
