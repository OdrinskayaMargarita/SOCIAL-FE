/* eslint-disable no-param-reassign */
import { createSlice, current } from "@reduxjs/toolkit";
import { normalizeFeedData, normalizeFeedsData } from "utils/feed.utils";
import { findIndex } from "lodash";
import { get, flow, set, find } from "lodash/fp";

import { normalizeGroupData } from "utils/group.utils";
import { DEFAULT_ENTITIES_TYPE, DEFAULT_LIMIT } from "../constants/pagination.constants";
import { getArticle, getArticles } from "../thunks/articles.thunks";
import { setLike } from "../thunks/feed.thunks";

const initialState = {
	entities: [],
	top: [],
	data: {
		itself: undefined,
		entities: [],
		entitiesType: DEFAULT_ENTITIES_TYPE,
		offset: 0,
		limit: DEFAULT_LIMIT,
		hasMore: true,
	},
	limit: DEFAULT_LIMIT,
	offset: 0,
	hasMore: true,
};

const articlesSlice = createSlice({
	name: "articles",
	initialState,
	reducers: {
		reset: () => initialState,
		changeArticlesData(state, action) {
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
		builder.addCase(getArticles.fulfilled, (state, { payload }) => {
			const { total = 0, items = [] } = payload.data;
			const totalEntities = state.entities.length + items.length;
			state.entities = [...state.entities, ...normalizeFeedsData(items)];
			state.offset += state.limit;
			state.hasMore = total > totalEntities;
		});
		builder.addCase(getArticle.fulfilled, (state, { payload }) => {
			state.data.itself = normalizeFeedData(payload.data);
		});
	},
});

export const { reset, changeArticlesData } = articlesSlice.actions;

export default articlesSlice;
