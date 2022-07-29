import { API_URL } from "env";
import { authorizedRequest, request } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const updateProfile = async (data) =>
	authorizedRequest(`${API_URL}${API_ENDPOINTS.auth.updateProfile}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

export const becomeMember = async () =>
	authorizedRequest(`${API_URL}${API_ENDPOINTS.becomeMember.sendCode}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

export const confirmMember = async (data) =>
	authorizedRequest(`${API_URL}${API_ENDPOINTS.becomeMember.confirmCode}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

export const checkPayment = async ({ uuid }) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.becomeMember.checkPayment}`);
	url.searchParams.append("uuid", uuid);
	return authorizedRequest(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
};
