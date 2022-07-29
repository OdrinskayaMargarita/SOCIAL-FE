import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeApiResponse } from "utils/api.utils";
import { createModalUserValue } from "store/constants/groups.constants";

import {
	fetchArticles,
	fetchSingleArticle,
	createSingleArticle,
	updateSingleArticle,
} from "api/articles.api";
import {
	GET_ARTICLE,
	GET_ARTICLES,
	CREATE_ARTICLE,
	EDIT_ARTICLE,
} from "../actions/articles.actions";

export const getArticles = createAsyncThunk(GET_ARTICLES, async (optData, { getState }) => {
	const {
		articles: { offset, limit },
		auth: { isLoggedIn },
	} = getState();
	const response = await fetchArticles(isLoggedIn, { offset, limit });
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const getArticle = createAsyncThunk(GET_ARTICLE, async (eventId, { getState }) => {
	const {
		auth: { isLoggedIn },
	} = getState();

	const response = await fetchSingleArticle(isLoggedIn, eventId);
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const createArticle = createAsyncThunk(CREATE_ARTICLE, async (optData) => {
	const body = {
		title: optData.title,
		title_image: null,
		content: optData.content || " ",
		show_in_article_feed: true,
		is_publish_in_my_feed: true,
	};

	if (optData.id !== createModalUserValue.id) {
		body.ids_group = [+optData.id];
		body.is_publish_in_my_feed = false;
		delete body.show_in_article_feed;
	}

	if (optData.avatar?.content) body.title_image = optData.avatar;
	const response = await createSingleArticle(body);
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const updateArticle = createAsyncThunk(EDIT_ARTICLE, async (optData) => {
	const response = await updateSingleArticle(optData);
	const data = await response.json();
	return normalizeApiResponse(data);
});
