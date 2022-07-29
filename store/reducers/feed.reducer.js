/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { normalizeFeedData, normalizeFeedsData } from "utils/feed.utils";
import { findIndex } from "lodash";
import { get, flow, set, find } from "lodash/fp";
import { getFeeds, getPost } from "../thunks/feed.thunks";

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

const feedSlice = createSlice({
	name: "feed",
	initialState,
	reducers: {
		reset: () => initialState,
		changeFeedsData(state, action) {
			const { key, value, id: idToUpdate } = action.payload;
			const searchedIndex = findIndex(state.entities, ({ id }) => id === idToUpdate);
			state.entities[searchedIndex] = flow([
				get("entities"),
				find(({ id }) => id === idToUpdate),
				set(`${key}`, value),
			])(state);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getFeeds.fulfilled, (state, { payload }) => {
			const { total = 0, items = [] } = payload.data;
			const totalEntities = state.entities.length + items.length;
			state.entities = [...state.entities, ...normalizeFeedsData(items)];
			state.offset += state.limit;
			state.hasMore = total > totalEntities;
		});
		builder.addCase(getPost.fulfilled, (state, { payload }) => {
			state.data.itself = normalizeFeedData(payload.data);
		});
	},
});

export const { reset, changeFeedsData } = feedSlice.actions;

export default feedSlice;
