/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { normalizeFeedsData } from "utils/feed.utils";
import { findIndex } from "lodash";
import { get, flow, set, find } from "lodash/fp";
import { getProposals, voteProposal } from "../thunks/proposals.thunk";

const DEFAULT_LIMIT = 10;

const initialState = {
	entities: [],
	limit: DEFAULT_LIMIT,
	offset: 0,
	hasMore: true,
	data: {
		itself: undefined,
	},
};

const proposalsSlice = createSlice({
	name: "proposals",
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getProposals.fulfilled, (state, { payload }) => {
			const { total = 0, items = [] } = payload.data;
			const totalEntities = state.entities.length + items.length;
			state.entities = [...state.entities, ...normalizeFeedsData(items)];
			state.offset += state.limit;
			state.hasMore = total > totalEntities;
		});
		builder.addCase(voteProposal.fulfilled, (state, { payload }) => {
			const { id: idToUpdate, votes } = payload.data;
			const searchedIndex = findIndex(state.entities, ({ id }) => id === idToUpdate);
			state.entities[searchedIndex] = flow([
				get("entities"),
				find(({ id }) => id === idToUpdate),
				set("votes", votes),
			])(state);
		});
	},
});

export const { reset, changeFeedsData } = proposalsSlice.actions;

export default proposalsSlice;
