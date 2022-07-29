import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProposals, voteProposal as onVoteProposal } from "api/proposals.api";
import { normalizeApiResponse } from "utils/api.utils";

import { FETCH_PROPOSALS, VOTE_PROPOSAL } from "../actions/proposals.actions";

export const getProposals = createAsyncThunk(FETCH_PROPOSALS, async (optData, { getState }) => {
	const {
		proposals: { offset, limit },
		auth: { isLoggedIn },
	} = getState();
	const response = await fetchProposals(isLoggedIn, { offset, limit });
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const voteProposal = createAsyncThunk(VOTE_PROPOSAL, async (optData) => {
	const response = await onVoteProposal(optData);
	const data = await response.json();
	return normalizeApiResponse(data);
});
