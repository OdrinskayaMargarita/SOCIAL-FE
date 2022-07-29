/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { normalizeUsersData, calculateSortDirection, normalizeUserData } from "utils/users.utils";

import { getUserData, getUsers } from "store/thunks/users.thunks";
import {
	DEFAULT_LIMIT,
	DEFAULT_ENTITIES_TYPE,
	DEFAULT_USERS_TABLE_LIMIT,
} from "store/constants/pagination.constants";
import { fetchFriends, fetchFriendsInvitations } from "../thunks/friends.thunks";
import { normilizeFriendsData } from "../../utils/friends.utils";

const initialState = {
	entities: [],
	top: [],
	limit: DEFAULT_USERS_TABLE_LIMIT,
	offset: 0,
	hasMore: true,
	sortDirection: "ASC",
	sortingParam: "FIRSTNAME",
	data: {
		itself: undefined,
		entities: [],
		entitiesType: DEFAULT_USERS_TABLE_LIMIT,
		offset: 0,
		limit: DEFAULT_LIMIT,
		hasMore: true,
	},
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		reset: () => initialState,
		clearEntities: (state) => {
			state.offset = 0;
			state.limit = DEFAULT_LIMIT;
			state.entities = [];
			state.data.hasMore = true;
		},
		clearUserData: (state) => {
			state.data = {
				itself: undefined,
				entities: [],
				entitiesType: DEFAULT_USERS_TABLE_LIMIT,
				offset: 0,
				limit: DEFAULT_LIMIT,
				hasMore: true,
			};
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
	},
	extraReducers: (builder) => {
		builder.addCase(getUsers.fulfilled, (state, { payload }) => {
			const { total = 0, items = [] } = payload.data;
			const totalEntities = state.entities.length + payload.data.items.length;
			state.entities = [...state.entities, ...normalizeUsersData(items)];
			state.offset += state.limit;
			state.hasMore = total > totalEntities;
		});
		builder.addCase(getUserData.fulfilled, (state, { payload }) => {
			state.data.itself = normalizeUserData(payload.data);
		});
		// builder.addCase(fetchFriends.fulfilled, (state, { payload }) => {
		// 	const { total = 0, items = [] } = payload.data;
		// 	state.entities = [...state.entities, ...normilizeFriendsData(items)];
		// 	state.offset += state.limit;
		// 	state.hasMore = payload.data.total < payload.data.items.length;
		// });
		// builder.addCase(fetchFriendsInvitations.fulfilled, (state, { payload }) => {
		// 	const { total = 0, items = [] } = payload.data;
		// 	state.entities = [...state.entities, ...normilizeFriendsData(items)];
		// 	state.offset += state.limit;
		// 	state.hasMore = payload.data.total < payload.data.items.length;
		// });
	},
});

export const { reset, setSortParams, clearEntities, clearUserData } = usersSlice.actions;

export default usersSlice;
