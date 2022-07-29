/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import { normilizeFriendsData } from "utils/friends.utils";
import { calculateSortDirection } from "utils/users.utils";
import { fetchFriends, fetchFriendsInvitations } from "../thunks/friends.thunks";

const DEFAULT_LIMIT = 10;

const initialState = {
	entities: [],
	entitiesInvations: [],
	limit: DEFAULT_LIMIT,
	offset: 0,
	hasMore: true,
	sortDirection: "ASC",
	sortingParam: "FIRSTNAME",
	onlyOnline: false,
};

const friendsSlice = createSlice({
	name: "friends",
	initialState,
	reducers: {
		reset: () => initialState,
		clearEntities: (state) => {
			state.offset = 0;
			state.limit = DEFAULT_LIMIT;
			state.entities = [];
			state.entitiesInvations = [];
		},
		setSortParams(state, action) {
			const { sortDirection, sortingParam } = calculateSortDirection(
				state.sortDirection,
				state.sortingParam,
				action.payload.key,
			);
			state.offset = 0;
			state.limit = DEFAULT_LIMIT;
			state.sortDirection = sortDirection;
			state.sortingParam = sortingParam;
		},
		setOnline(state, action) {
			state.onlyOnline = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchFriends.fulfilled, (state, { payload }) => {
			const { total = 0, items = [] } = payload.data;
			const totalEntities = state.entities.length + items.length;
			state.entities = [...state.entities, ...normilizeFriendsData(items)];
			state.offset += state.limit;
			state.hasMore = total > totalEntities;
		});
		builder.addCase(fetchFriendsInvitations.fulfilled, (state, { payload }) => {
			state.entitiesInvations = [
				...state.entitiesInvations,
				...normilizeFriendsData(payload.data?.items),
			];
		});
	},
});

export const { reset, setSortParams, setOnline, clearEntities } = friendsSlice.actions;

export default friendsSlice;
