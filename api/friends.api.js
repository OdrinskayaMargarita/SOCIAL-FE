import { API_URL } from "env";
import { authorizedRequest, request } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const fetchFriendsList = async (data, isPrivate) => {
	return isPrivate
		? authorizedRequest(`${API_URL}${API_ENDPOINTS.friends.getList}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
		  })
		: request(`${API_URL}${API_ENDPOINTS.friends.getList}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
		  });
};

export const fetchFriendsInvitationsList = async (data) =>
	authorizedRequest(`${API_URL}${API_ENDPOINTS.friends.getInvitations}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

export const acceptFriend = async (userId) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.friends.acceptRequest}`);
	url.searchParams.append("id_user", userId);

	return authorizedRequest(url);
};

export const addFriend = async (userId) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.friends.sendRequest}`);
	url.searchParams.append("id_user", userId);

	return authorizedRequest(url);
};

export const deleteFriend = async (userId) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.friends.declineRequest}`);
	url.searchParams.append("id_user", userId);

	return authorizedRequest(url);
};
