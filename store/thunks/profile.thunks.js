import { createAsyncThunk } from "@reduxjs/toolkit";
import set from "lodash/fp/set";
import { updateProfile, fetchFeedsByUser, becomeMember, confirmMember } from "api";
import { normalizeApiResponse } from "utils/api.utils";
import { prepareProfileData } from "utils/auth.utils";
import { checkPayment } from "api/profile.api";
import { UPDATE_PROFILE } from "../actions/auth.actions";
import {
	GET_FEED_BY_USER,
	BECOME_MEMBER_CODE,
	CONFIRM_MEMBER_CODE,
	CHECK_PROFILE_INVOICE,
} from "../actions/profile.actions";

export const updateProfileData = createAsyncThunk(UPDATE_PROFILE, async (userData) => {
	const response = await updateProfile(prepareProfileData(userData));
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const getUsersFeed = createAsyncThunk(
	GET_FEED_BY_USER,
	async ({ type, id }, { getState }) => {
		const {
			profile: { offset, limit, entitiesType },
			auth: { isLoggedIn },
		} = getState();
		const isSameEntityType = entitiesType === type;
		const response = await fetchFeedsByUser({
			type,
			id,
			offset: isSameEntityType ? offset : 0,
			limit,
			isPrivate: isLoggedIn,
		});
		const data = await response.json();
		const extendedData = set(["data", "type"], type, data);

		return normalizeApiResponse(extendedData);
	},
);

export const becomeMemberCode = createAsyncThunk(BECOME_MEMBER_CODE, async () => {
	const response = await becomeMember();
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const confirmMemberCode = createAsyncThunk(
	CONFIRM_MEMBER_CODE,
	async ({ memberSecureCode, secureCode }) => {
		const response = await confirmMember({
			public_code: memberSecureCode,
			code: secureCode,
		});
		const data = await response.json();

		return normalizeApiResponse(data);
	},
);

export const checkCooperatorPayment = createAsyncThunk(CHECK_PROFILE_INVOICE, async ({ uuid }) => {
	const response = await checkPayment({
		uuid,
	});
	const data = await response.json();

	return normalizeApiResponse(data);
});
