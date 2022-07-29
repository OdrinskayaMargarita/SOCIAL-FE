import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeApiResponse } from "utils/api.utils";

import {
	fetchSolutionData,
	fetchSolutions,
	createSolutionData,
	addSolution,
	voteSolution,
	updateSolutionData,
} from "api/solutions.api";
import { cloneDeep } from "lodash";
import { createModalUserValue } from "store/constants/groups.constants";
import {
	CREATE_SOLUTION,
	FETCH_SOLUTION_DATA,
	GET_SOLUTIONS,
	VOTE,
	ADD_SOLUTION,
	UPDATE_SOLUTION,
} from "../actions/solutions.actions";

export const getSolutions = createAsyncThunk(GET_SOLUTIONS, async (optData, { getState }) => {
	const {
		solutions: { offset, limit },
		auth: { isLoggedIn },
	} = getState();
	const response = await fetchSolutions(isLoggedIn, { offset, limit });
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const getSolutionData = createAsyncThunk(
	FETCH_SOLUTION_DATA,
	async (solutionId, { getState }) => {
		const {
			auth: { isLoggedIn },
		} = getState();
		const response = await fetchSolutionData(solutionId, isLoggedIn);
		const data = await response.json();
		return normalizeApiResponse(data);
	},
);

export const createSolution = createAsyncThunk(
	CREATE_SOLUTION,
	async ({ title, description, startVoting, endVoting, solutions, id }) => {
		const response = await createSolutionData({
			name: title,
			description,
			solutions: [
				...solutions.map((solution, index) => {
					return {
						name: solution,
						description: `solution ${index}`,
					};
				}),
			],
			start_timestamp: +startVoting / 1000,
			end_timestamp: +endVoting / 1000,
			id_group: id !== createModalUserValue.id ? +id : null,
			is_publish_in_my_feed: id === createModalUserValue.id,
		});
		const data = await response.json();
		return normalizeApiResponse(data);
	},
);

export const updateSolution = createAsyncThunk(
	UPDATE_SOLUTION,
	async ({ title, description, id }) => {
		const response = await updateSolutionData({
			name: title,
			description,
			id: +id,
		});
		const data = await response.json();
		return normalizeApiResponse(data);
	},
);

export const addSolutionToVote = createAsyncThunk(ADD_SOLUTION, async (optData) => {
	const response = await addSolution(optData);
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const voteThunk = createAsyncThunk(VOTE, async ({ items, id }) => {
	const response = await voteSolution({
		id_voting: id,
		solutions_ordering: cloneDeep(items.map((solution) => +solution.id)),
	});

	const data = await response.json();
	return normalizeApiResponse(data);
});
