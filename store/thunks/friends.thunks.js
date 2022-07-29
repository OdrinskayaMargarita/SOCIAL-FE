import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFriendsList, followGroup } from "api";
import { normalizeApiResponse } from "utils/api.utils";

import {
	ACCEPT_TO_FRIENDS,
	ADD_TO_FRIENDS,
	FETCH_FRIENDS_INVITATIONS_LIST,
	FETCH_FRIENDS_LIST,
} from "../actions/friends.actions";
import {
	acceptFriend,
	addFriend,
	deleteFriend,
	fetchFriendsInvitationsList,
} from "../../api/friends.api";

export const fetchFriends = createAsyncThunk(FETCH_FRIENDS_LIST, async (id, { getState }) => {
	const {
		friends: { offset, limit, sortingParam, sortDirection, onlyOnline },
		auth: { isLoggedIn },
	} = getState();
	const response = await fetchFriendsList({
		offset,
		limit,
		sorting_param: sortingParam,
		direction: sortDirection,
		only_online: onlyOnline,
		id_user: id,
		isLoggedIn,
	});
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const fetchFriendsInvitations = createAsyncThunk(
	FETCH_FRIENDS_INVITATIONS_LIST,
	async (id, { getState }) => {
		const {
			friends: { offset, limit, sortingParam, sortDirection, onlyOnline },
		} = getState();
		const response = await fetchFriendsInvitationsList({
			offset,
			limit,
		});
		const data = await response.json();

		return normalizeApiResponse(data);
	},
);

export const acceptToFriends = createAsyncThunk(ACCEPT_TO_FRIENDS, async (userId) => {
	const response = await acceptFriend(userId);
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const addToFriends = createAsyncThunk(ADD_TO_FRIENDS, async (userId) => {
	const response = await addFriend(userId);
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const removeFromFriends = createAsyncThunk(ADD_TO_FRIENDS, async (userId) => {
	const response = await deleteFriend(userId);
	const data = await response.json();

	return normalizeApiResponse(data);
});
