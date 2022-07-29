import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFeeds, setLikeApi, createPostApi } from "api";
import { normalizeApiResponse } from "utils/api.utils";

import { FETCH_FEEDS, SET_LIKE, CREATE_POST, GET_POST } from "../actions/feed.actions";
import { fetchSinglePost } from "../../api/feed.api";

export const getFeeds = createAsyncThunk(FETCH_FEEDS, async (optData, { getState }) => {
	const {
		feed: { offset, limit },
		auth: { isLoggedIn },
	} = getState();
	const response = await fetchFeeds(isLoggedIn, { offset, limit });
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const setLike = createAsyncThunk(SET_LIKE, async (optData) => {
	const response = await setLikeApi(optData);
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const createPost = createAsyncThunk(CREATE_POST, async (optData) => {
	const response = await createPostApi(optData);
	const data = await response.json();

	return normalizeApiResponse(data);
});

export const getPost = createAsyncThunk(GET_POST, async (eventId, { getState }) => {
	const {
		auth: { isLoggedIn },
	} = getState();

	const response = await fetchSinglePost(isLoggedIn, eventId);
	const data = await response.json();
	return normalizeApiResponse(data);
});
