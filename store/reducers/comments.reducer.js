/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { normalizeComments } from "utils/feed.utils";

import { getComments } from "store/thunks/comments.thunks";
import { DEFAULT_ENTITIES_TYPE, DEFAULT_COMMENTS_LIMIT } from "../constants/pagination.constants";

const initialState = {
	entities: [],
	data: {
		itself: undefined,
		entities: [],
		entitiesType: DEFAULT_ENTITIES_TYPE,
		offset: 0,
		limit: DEFAULT_COMMENTS_LIMIT,
		hasMore: true,
	},
	limit: DEFAULT_COMMENTS_LIMIT,
	offset: 0,
	hasMore: true,
};

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getComments.fulfilled, (state, { payload }) => {
			const { total = 0, items = [] } = payload.data;
			state.entities = normalizeComments(items);
			state.offset += state.limit;
			state.hasMore = total < items.length;
		});
	},
});

export const { reset } = commentsSlice.actions;

export default commentsSlice;
