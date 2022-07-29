import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchFeedsData,
	fetchGroupData,
	fetchGroups,
	fetchTopGroups,
	followGroup,
	unfollowGroup,
	createGroupData,
	getCountriesData,
	updateGroupData,
} from "api";
import set from "lodash/fp/set";
import {
	DEFAULT_CATEGORY_ID,
	DEFAULT_CATEGORY_ITEM_ID,
	DEFAULT_SUBJECT_ID,
	groupsMembersRole,
} from "store/constants/groups.constants";
import { normalizeApiResponse } from "utils/api.utils";
import { isNil } from "lodash";

import {
	FETCH_GROUP_DATA,
	FETCH_GROUPS,
	FETCH_RELATED_ENTITIES,
	FETCH_TOP_GROUPS,
	FOLLOW_GROUP,
	UNFOLLOW_GROUP,
	GET_COUNTRIES,
	CREATE_ONE,
	UPDATE_ONE,
	GET_USER_GROUPS,
	GET_GROUP_MEMBERS,
	FETCH_TRANSACTIONS,
	GET_GROUP_APPLICANTS,
	CHANGE_GROUP_APPLICANT_ROLE,
} from "../actions/groups.actions";
import {
	findGroupMembers,
	getWalletData,
	getWalletTransactions,
	changeGroupApplicantRole,
} from "../../api/group.api";

export const getTopGroups = createAsyncThunk(FETCH_TOP_GROUPS, async (optData, { getState }) => {
	const {
		auth: { isLoggedIn },
	} = getState();
	const response = await fetchTopGroups(isLoggedIn);
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const getGroups = createAsyncThunk(FETCH_GROUPS, async (optData, { getState }) => {
	const { userId } = optData;
	const {
		group: { offset, limit, sortDirection, sortingParam, onlyAdmin },
		auth: { isLoggedIn, user },
	} = getState();
	const body = {
		offset,
		limit,
		direction: sortDirection,
		soring_param: sortingParam,
	};
	if (onlyAdmin) {
		body.user_roles = onlyAdmin;
		body.id_user = user.id;
	}
	if (!isNil(userId)) {
		body.id_user = userId;
	}
	const response = await fetchGroups(isLoggedIn, body);
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const getGroupsByUser = createAsyncThunk(GET_USER_GROUPS, async (optData, { getState }) => {
	const { userId } = optData;
	const {
		auth: { isLoggedIn },
	} = getState();

	const body = {
		direction: "ASC",
		user_id: userId,
		limit: 1000,
		offset: 0,
		soring_param: "NAME",
	};

	const response = await fetchGroups(isLoggedIn, body);
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const fetchGoupRelatedEntities = createAsyncThunk(
	FETCH_RELATED_ENTITIES,
	async ({ id, type }, { getState }) => {
		const {
			auth: { isLoggedIn },
			group: {
				data: { offset, limit, entitiesType },
			},
		} = getState();
		const isSameEntityType = entitiesType === type;
		const response =
			type === "PAYMENT"
				? await getWalletData(id, {
						offset: isSameEntityType ? offset : 0,
						limit,
						type,
				  })
				: type === "MEMBER"
				? await findGroupMembers(id, isLoggedIn, {
						offset: isSameEntityType ? offset : 0,
						limit,
						type,
				  })
				: await fetchFeedsData(id, isLoggedIn, {
						offset: isSameEntityType ? offset : 0,
						limit,
						type,
				  });
		const data = await response.json();
		const extendedData = set(["data", "type"], type, data);

		return normalizeApiResponse(extendedData);
	},
);

export const fetchTransactions = createAsyncThunk(
	FETCH_TRANSACTIONS,
	async ({ groupId, walletId }, { getState }) => {
		const {
			auth: { isLoggedIn },
		} = getState();
		const response = await getWalletTransactions({ groupId, walletId }, isLoggedIn);
		const data = await response.json();

		return normalizeApiResponse(data);
	},
);

export const getGroupData = createAsyncThunk(FETCH_GROUP_DATA, async (groupId, { getState }) => {
	const {
		auth: { isLoggedIn },
	} = getState();
	const response = await fetchGroupData(groupId, isLoggedIn);
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const joinGroup = createAsyncThunk(FOLLOW_GROUP, async (groupId) => {
	const response = await followGroup(groupId);
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const leaveGroup = createAsyncThunk(UNFOLLOW_GROUP, async (groupId) => {
	const response = await unfollowGroup(groupId);
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const getCountries = createAsyncThunk(GET_COUNTRIES, async () => {
	const response = await getCountriesData();
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const createGroup = createAsyncThunk(
	CREATE_ONE,
	async ({ name, description, country, city, type }) => {
		const response = await createGroupData({
			name,
			description,
			id_subject: DEFAULT_SUBJECT_ID,
			id_category_item: DEFAULT_CATEGORY_ITEM_ID,
			id_category: DEFAULT_CATEGORY_ID,
			id_country: +country,
			city,
			type,
		});
		const data = await response.json();

		return normalizeApiResponse(data);
	},
);

export const updateGroup = createAsyncThunk(UPDATE_ONE, async (optData) => {
	const response = await updateGroupData(optData);
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const getMembers = createAsyncThunk(GET_GROUP_MEMBERS, async (groupId, { getState }) => {
	const {
		group: { offset, limit, sortDirection, sortingParam },
		auth: { isLoggedIn },
	} = getState();
	const response = await findGroupMembers(isLoggedIn, {
		offset,
		limit,
		direction: sortDirection,
		soring_param: sortingParam === "NAME" ? "FIRSTNAME" : sortingParam,
		id_group: groupId,
		roles: [
			groupsMembersRole.OWNER,
			groupsMembersRole.ADMINISTRATOR,
			groupsMembersRole.MODERATOR,
			groupsMembersRole.FOLLOWER,
		],
	});
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const getApplicants = createAsyncThunk(
	GET_GROUP_APPLICANTS,
	async (groupId, { getState }) => {
		const {
			group: {
				limit,
				sortDirection,
				sortingParam,
				applicants: { offset },
			},
			auth: { isLoggedIn },
		} = getState();
		const response = await findGroupMembers(isLoggedIn, {
			offset,
			limit,
			direction: sortDirection,
			soring_param: sortingParam === "NAME" ? "FIRSTNAME" : sortingParam,
			id_group: groupId,
			roles: [groupsMembersRole.REQUEST_SUBMITTED],
		});
		const data = await response.json();
		return normalizeApiResponse(data);
	},
);

export const onChangeGroupApplicantRole = createAsyncThunk(
	CHANGE_GROUP_APPLICANT_ROLE,
	async (respData) => {
		const response = await changeGroupApplicantRole(respData);
		const data = await response.json();
		return { userId: respData.id_user };
	},
);
