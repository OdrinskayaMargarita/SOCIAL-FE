import { API_URL } from "env";
import { createModalUserValue } from "store/constants/groups.constants";
import { authorizedRequest, request } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const fetchFeeds = async (isPrivate, { offset, limit }) => {
	const url = `${API_URL}${API_ENDPOINTS.feed.common}`;
	const body = JSON.stringify({ offset, limit, is_show_common_group_content: true });
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};
	return isPrivate ? authorizedRequest(url, parameters) : request(url, parameters);
};

export const fetchFeedsByUser = async ({ id, type, offset, limit, isPrivate }) => {
	const url = `${API_URL}${API_ENDPOINTS.feed.findByUser}`;
	const body = JSON.stringify({ offset, limit, id_user: id, publication_type: type });
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};
	return isPrivate ? authorizedRequest(url, parameters) : request(url, parameters);
};

export const setLikeApi = async ({ id, type }) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.feed.setLike}`);
	url.searchParams.append("id_parent", id);
	url.searchParams.append("parent_type", type);

	return authorizedRequest(url);
};

export const fetchSinglePost = async (isPrivate, id) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.feed.getPost}`);
	url.searchParams.append("id", id);

	return isPrivate ? authorizedRequest(url) : request(url);
};

export const createPostApi = async (data) => {
	const url = `${API_URL}${API_ENDPOINTS.feed.createPost}`;
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

export default fetchFeeds;
