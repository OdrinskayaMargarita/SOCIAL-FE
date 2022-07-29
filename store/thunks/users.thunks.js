import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, fetchUserData } from "api/users.api";
import { normalizeApiResponse } from "utils/api.utils";

import { FETCH_USERS, FETCH_USER } from "../actions/users.actions";

export const getUsers = createAsyncThunk(FETCH_USERS, async (optData, { getState }) => {
	const {
		users: { offset, limit, sortDirection, sortingParam },
		auth: { isLoggedIn },
	} = getState();
	const response = await fetchUsers(isLoggedIn, {
		offset,
		limit,
		direction: sortDirection,
		soring_param: sortingParam,
	});
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const getUserData = createAsyncThunk(FETCH_USER, async (userId, { getState }) => {
	const {
		auth: { isLoggedIn },
	} = getState();
	const response = await fetchUserData(userId, isLoggedIn);
	const data = await response.json();

	return normalizeApiResponse(data);
});
