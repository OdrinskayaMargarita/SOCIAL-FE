import { API_URL } from "env";
import { request } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const fetchComments = async (data) => {
	const url = `${API_URL}${API_ENDPOINTS.comments.list}`;
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
