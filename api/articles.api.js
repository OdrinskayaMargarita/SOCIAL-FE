import { API_URL } from "env";
import { authorizedRequest, request } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const fetchArticles = async (isPrivate, { offset, limit }) => {
	const url = `${API_URL}${API_ENDPOINTS.articles.list}`;
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

export const fetchSingleArticle = async (isPrivate, id) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.articles.getById}`);
	url.searchParams.append("id", id);

	return isPrivate ? authorizedRequest(url) : request(url);
};

export const createSingleArticle = async (data) => {
	const url = `${API_URL}${API_ENDPOINTS.articles.create}`;
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

export const updateSingleArticle = async (data) => {
	const url = `${API_URL}${API_ENDPOINTS.articles.update}`;
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
