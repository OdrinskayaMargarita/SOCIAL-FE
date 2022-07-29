/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import get from "lodash/fp/get";
import { normalizeFeedsData } from "utils/feed.utils";
import { DEFAULT_ENTITIES_TYPE, DEFAULT_LIMIT } from "../constants/pagination.constants";
import { becomeMemberCode, getUsersFeed, confirmMemberCode } from "../thunks/profile.thunks";

const initialState = {
	entities: [],
	limit: DEFAULT_LIMIT,
	entitiesType: DEFAULT_ENTITIES_TYPE,
	offset: 0,
	hasMore: true,
	invoice: {
		memberSecureCode: null,
		url: null,
		price: null,
		currency: null,
		uuid: null,
	},
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getUsersFeed.fulfilled, (state, { payload }) => {
			const { items = [], type = DEFAULT_ENTITIES_TYPE, total = 0 } = payload.data;
			if (state.entitiesType === type) {
				state.entities = [...state.entities, ...normalizeFeedsData(items)];
				state.offset += state.limit;
				state.hasMore = total > state.entities.length + items.length;
			} else {
				state.entities = normalizeFeedsData(items);
				state.hasMore = total > items.length;
				state.offset = DEFAULT_LIMIT;
				state.entitiesType = type;
			}
		});
		builder.addCase(becomeMemberCode.fulfilled, (state, { payload }) => {
			state.invoice = { ...state.invoice, memberSecureCode: payload.data };
		});
		builder.addCase(confirmMemberCode.fulfilled, (state, { payload }) => {
			if (payload.data) {
				state.invoice = {
					...state.invoice,
					url: get("invoice_url", payload.data),
					uuid: get("uuid", payload.data),
					price: get("price", payload.data),
					currency: get("currency", payload.data),
				};
			}
		});
	},
});

export const { reset } = profileSlice.actions;

export default profileSlice;
