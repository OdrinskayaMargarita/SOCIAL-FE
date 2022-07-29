import { API_URL } from "env";
import { authorizedRequest, request } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const fetchUsers = async (isPrivate, data) => {
	const url = `${API_URL}${API_ENDPOINTS.users.find}`;
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

export const fetchUserData = async (id, isPrivate) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.users.findById}/${id}`);
	return isPrivate ? authorizedRequest(url) : request(url);
};
