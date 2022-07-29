import { API_URL } from "env";
import { authorizedRequest, request } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const fetchSolutions = async (isPrivate, { offset, limit }) => {
	const url = `${API_URL}${API_ENDPOINTS.solutions.list}`;
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

export const fetchSolutionData = async (id, isPrivate) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.solutions.findById}`);
	url.searchParams.append("id", id);

	return isPrivate ? authorizedRequest(url) : request(url);
};

export const createSolutionData = async (optData) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.solutions.createOne}`);
	const body = JSON.stringify(optData);
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};
	return authorizedRequest(url, parameters);
};

export const updateSolutionData = async (optData) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.solutions.update}`);
	const body = JSON.stringify(optData);
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};
	return authorizedRequest(url, parameters);
};

export const addSolution = async (optData) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.solutions.updateSolution}`);
	const body = JSON.stringify(optData);
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};
	return authorizedRequest(url, parameters);
};

export const voteSolution = async (optData) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.solutions.vote}`);
	const body = JSON.stringify(optData);
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};

	return authorizedRequest(url, parameters);
};
