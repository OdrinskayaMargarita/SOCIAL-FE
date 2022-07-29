import React, { useState, useCallback } from "react";
import { getSolutionData, addSolutionToVote } from "store/thunks/solutions.thunks";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { InputBase } from "@mui/material";
import { SolutionTimer } from "./Timer";
import Avatar from "../../../core-components/Avatar";

export const FindSolution = (solution) => {
	const dispatch = useDispatch();
	const { translation } = useSelector((state) => state.app);
	const {
		content: { solutions, startTimestamp },
		id,
		author,
	} = solution;

	const [isInputActive, setIsInputActive] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const endAction = useCallback(() => dispatch(getSolutionData(id)), [dispatch]);

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
		<>
			<Typography variant="h3">До начала голосования</Typography>
			<SolutionTimer timestamp={startTimestamp} endAction={endAction} />
			<Typography>{translation?.["solution_offering_solutions.description"]}</Typography>
			<Typography variant="h2">{translation?.["solution.details.suggested _options\t"]}</Typography>
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
					<Grid container justifyContent="space-between" alignItems="center" spacing={2}>
						<Grid item xs={11}>
							<Typography>{singleSolution?.name}</Typography>
						</Grid>
						<Grid item xs={1}>
							{author?.avatar?.url && <Avatar src={author.avatar.url} alt="" />}
						</Grid>
					</Grid>
				</Box>
			))}
			{isInputActive && (
				<Grid spacing={2} justifyContent="space-between" mt={2}>
					<InputBase
						onChange={(event) => setInputValue(event.target.value)}
						placeholder="Добавить решение"
					/>
					<Button onClick={sendSolution}>Добавить</Button>
				</Grid>
			)}
			{isLoggedIn && (
				<Box mt={2}>
					<Button onClick={() => setIsInputActive(true)} fullWidth>
						{translation?.["solution_offering_solutions.add_solution_button"]}
					</Button>
				</Box>
			)}
		</>
	);
};
