import { API_URL } from "env";
import { authorizedRequest, request } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const fetchProposals = async (isPrivate, { offset, limit }) => {
	const url = `${API_URL}${API_ENDPOINTS.proposals.list}`;
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

export const voteProposal = async (data) => {
	const url = `${API_URL}${API_ENDPOINTS.proposals.vote}`;
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
