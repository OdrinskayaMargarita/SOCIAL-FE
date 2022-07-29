/* eslint-disable no-param-reassign */
import { createSlice, current } from "@reduxjs/toolkit";
import { normalizeFeedsData } from "utils/feed.utils";
import {
	normalizeGroupCountries,
	normalizeGroupData,
	normalizeGroupMembersData,
	normalizeGroupsData,
} from "utils/group.utils";
import { calculateSortDirection } from "utils/users.utils";

import { get, flow, set, find } from "lodash/fp";
import { findIndex, cloneDeep } from "lodash";
import { createModalUserValue } from "store/constants/groups.constants";
import {
	DEFAULT_ENTITIES_TYPE,
	DEFAULT_GROUPS_TABLE_LIMIT,
} from "../constants/pagination.constants";
import {
	fetchGoupRelatedEntities,
	getCountries,
	getGroupData,
	getGroups,
	getTopGroups,
	updateGroup,
	getGroupsByUser,
	getMembers,
	fetchTransactions,
	getApplicants,
	onChangeGroupApplicantRole,
} from "../thunks/group.thunks";

const initialState = {
	entities: [],
	top: [],
	data: {
		itself: undefined,
		entities: [],
		entitiesType: DEFAULT_ENTITIES_TYPE,
		offset: 0,
		limit: DEFAULT_GROUPS_TABLE_LIMIT,
		hasMore: true,
		wallet: null,
	},
	applicants: {
		itself: undefined,
		entities: [],
		entitiesType: DEFAULT_ENTITIES_TYPE,
		offset: 0,
		limit: DEFAULT_GROUPS_TABLE_LIMIT,
		hasMore: true,
	},
	limit: DEFAULT_GROUPS_TABLE_LIMIT,
	offset: 0,
	hasMore: true,
	sortingParam: "NAME",
	sortDirection: "ASC",
	countries: [],
	userGroups: [],
	userGroupsWithFeed: [],
};

const groupsSlice = createSlice({
	name: "group",
	initialState,
	reducers: {
		reset: () => initialState,
		clearEntities: (state) => {
			state.offset = 0;
			state.limit = DEFAULT_GROUPS_TABLE_LIMIT;
			state.entities = [];
		},
		setSortParams(state, action) {
			const { sortDirection, sortingParam } = calculateSortDirection(
				state.sortDirection,
				state.sortingParam,
				action.payload.key,
			);
			state.offset = 0;
			state.limit = DEFAULT_GROUPS_TABLE_LIMIT;
			state.sortDirection = sortDirection;
			state.sortingParam = sortingParam;
		},
		changeGroupData(state, action) {
			state.data.itself[`${action.payload.key}`] = action.payload.value;
		},
		changeGroupListData(state, action) {
			const { key, value, id: idToUpdate } = action.payload;
			const searchedIndex = findIndex(state.entities, ({ id }) => id === idToUpdate);
			state.entities[searchedIndex] = flow([
				get("entities"),
				find(({ id }) => id === idToUpdate),
				set(`${key}`, value),
			])(state);
		},
		changeTopGroupListData(state, action) {
			const { key, value, id: idToUpdate } = action.payload;
			const searchedIndex = findIndex(state.entities, ({ id }) => id === idToUpdate);
			state.top[searchedIndex] = flow([
				get("top"),
				find(({ id }) => id === idToUpdate),
				set(`${key}`, value),
			])(state);
		},
		setOnlyAdmin(state, action) {
			if (action.payload) {
				state.onlyAdmin = ["OWNER"];
			} else state.onlyAdmin = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTopGroups.fulfilled, (state, { payload }) => {
				state.top = normalizeGroupsData(payload.data?.items);
			})
			.addCase(getGroups.fulfilled, (state, { payload }) => {
				const { total = 0, items = [] } = payload.data;
				const totalEntities = state.entities.length + items.length;
				state.entities = [...state.entities, ...normalizeGroupsData(items)];
				state.offset += state.limit;
				state.hasMore = total > totalEntities;
			})
			.addCase(getGroupData.fulfilled, (state, { payload }) => {
				state.data.itself = normalizeGroupData(payload.data);
			})
			.addCase(getGroupsByUser.fulfilled, (state, { payload }) => {
				const userGroups = payload.data.items;
				state.userGroups = cloneDeep(userGroups);
				userGroups.unshift(createModalUserValue);
				state.userGroupsWithFeed = userGroups;
			})
			.addCase(updateGroup.fulfilled, (state, { payload }) => {
				state.data.itself = normalizeGroupData(payload.data);
			})
			.addCase(fetchGoupRelatedEntities.fulfilled, (state, { payload }) => {
				const { items = [], type = DEFAULT_ENTITIES_TYPE, total = 0 } = payload.data;
				const totalEntities = state.data.entities.length + items.length;
				if (type === "PAYMENT") {
					state.data = {
						...state.data,
						wallet: payload.data,
					};
				}
				if (state.data.entitiesType === type) {
					state.data = {
						...state.data,
						offset: state.offset + state.limit,
						entities: [...state.data.entities, ...normalizeFeedsData(items)],
						hasMore: total > totalEntities,
					};
				} else {
					state.data = {
						...state.data,
						entitiesType: type,
						offset: DEFAULT_GROUPS_TABLE_LIMIT,
						entities: normalizeFeedsData(items),
						hasMore: total > items.length,
					};
				}
			})
			.addCase(getCountries.fulfilled, (state, { payload }) => {
				state.countries = normalizeGroupCountries(payload.data);
			})
			.addCase(getMembers.fulfilled, (state, { payload }) => {
				const { total = 0, items = [] } = payload.data;
				const totalEntities = state.entities.length + items.length;
				state.entities = [...state.entities, ...normalizeGroupMembersData(items)];
				state.offset += state.limit;
				state.hasMore = total > totalEntities;
				state.applicants.offset = 0;
				state.applicants.entities = [];
			})
			.addCase(getApplicants.fulfilled, (state, { payload }) => {
				const { total = 0, items = [] } = payload.data;
				const totalEntities = state.applicants.entities.length + items.length;
				state.applicants.entities = [
					...state.applicants.entities,
					...normalizeGroupMembersData(items),
				];
				state.applicants.offset += state.limit;
				state.applicants.hasMore = total > totalEntities;
				state.offset = 0;
				state.entities = [];
			})
			.addCase(onChangeGroupApplicantRole.fulfilled, (state, { payload }) => {
				const { userId } = payload;
				state.applicants.entities = state.applicants.entities.filter((el) => el.id !== userId);
			})
			.addCase(fetchTransactions.fulfilled, (state, { payload }) => {
				state.data = {
					...state.data,
					transaction: payload.data,
				};
			});
	},
});

export const {
	reset,
	clearEntities,
	setSortParams,
	changeGroupListData,
	changeGroupData,
	changeTopGroupListData,
	setOnlyAdmin,
} = groupsSlice.actions;

export default groupsSlice;
