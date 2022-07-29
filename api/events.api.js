import { API_URL } from "env";
import { authorizedRequest, request } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const fetchEvents = async (isPrivate, { offset, limit }) => {
	const url = `${API_URL}${API_ENDPOINTS.events.list}`;
	const body = JSON.stringify({ offset, limit });
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};
	return isPrivate ? authorizedRequest(url, parameters) : request(url, parameters);
};

export const fetchSingleEvent = async (isPrivate, id) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.events.getById}`);
	url.searchParams.append("id", id);

	return isPrivate ? authorizedRequest(url) : request(url);
};

export const createSingleEvent = async (data) => {
	const url = `${API_URL}${API_ENDPOINTS.events.create}`;
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
