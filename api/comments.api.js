import { API_URL } from "env";
import { authorizedRequest } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const createSingleComment = async (data) => {
	const url = `${API_URL}${API_ENDPOINTS.comments.create}`;
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
