import { API_URL } from "env";
import { authorizedRequest, request } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const fetchTopGroups = async (isPrivate) => {
	const url = `${API_URL}${API_ENDPOINTS.groups.getTop}`;

	return isPrivate ? authorizedRequest(url) : request(url);
};

export const fetchGroups = async (isPrivate, data) => {
	const url = `${API_URL}${API_ENDPOINTS.groups.find}`;
	const body = JSON.stringify(data);

	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};
	return isPrivate ? authorizedRequest(url, parameters) : request(url, parameters);
};

export const fetchGroupData = async (id, isPrivate) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.groups.findById}`);
	url.searchParams.append("id", id);

	return isPrivate ? authorizedRequest(url) : request(url);
};

export const fetchFeedsData = async (id, isPrivate, { offset, limit, type = "ALL" }) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.groups.getFeed}`);

	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			limit,
			offset,
			id_group: +id,
			publication_type: type,
		}),
	};

	return isPrivate ? authorizedRequest(url, parameters) : request(url, parameters);
};

export const getWalletData = async (id) => {
	return authorizedRequest(`${API_URL}${API_ENDPOINTS.groups.getWallet}?id_group=${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const getWalletTransactions = async ({ groupId, walletId }) => {
	const dataToSend = {
		limit: 10,
		offset: 0,
		id_group: groupId,
		id_wallet: walletId,
	};
	return authorizedRequest(`${API_URL}${API_ENDPOINTS.groups.getWalletTransactions}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dataToSend),
	});
};

export const followGroup = async (groupId) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.groups.follow}`);
	url.searchParams.append("id", groupId);

	return authorizedRequest(url);
};

export const unfollowGroup = async (groupId) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.groups.unfollow}`);
	url.searchParams.append("id", groupId);

	return authorizedRequest(url);
};

export const getCountriesData = async () => {
	const url = `${API_URL}${API_ENDPOINTS.groups.getCountries}`;
	return request(url);
};

export const createGroupData = async (data) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.groups.create}`);
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	return authorizedRequest(url, parameters);
};

export const updateGroupData = async (data) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.groups.update}`);
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	return authorizedRequest(url, parameters);
};

export const findGroupMembers = async (id, data) => {
	const url = `${API_URL}${API_ENDPOINTS.groups.findMembers}`;
	const body = JSON.stringify(data);
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};
	return request(url, parameters);
};

export const changeGroupApplicantRole = async (data) => {
	const url = `${API_URL}${API_ENDPOINTS.groups.changeApplicantRole}`;
	const body = JSON.stringify(data);
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};
	return authorizedRequest(url, parameters);
};
