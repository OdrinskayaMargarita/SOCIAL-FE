import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeApiResponse } from "utils/api.utils";
import { createModalUserValue } from "store/constants/groups.constants";
import { createSingleEvent, fetchEvents, fetchSingleEvent } from "api/events.api";
import { cloneDeep } from "lodash";
import { GET_EVENTS, GET_EVENT, CREATE_EVENT } from "../actions/events.actions";

export const getEvents = createAsyncThunk(GET_EVENTS, async (optData, { getState }) => {
	const {
		events: { offset, limit },
		auth: { isLoggedIn },
	} = getState();
	const response = await fetchEvents(isLoggedIn, { offset, limit });
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const getEvent = createAsyncThunk(GET_EVENT, async (articleId, { getState }) => {
	const {
		auth: { isLoggedIn },
	} = getState();

	const response = await fetchSingleEvent(isLoggedIn, articleId);
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const createEvent = createAsyncThunk(CREATE_EVENT, async (optData) => {
	const body = {
		title: optData.title,
		content: optData.content || " ",
		show_in_event_feed: true,
		address: optData.address,
		start_timestamp: +optData.startTime / 1000,
		end_timestamp: +optData.endTime / 1000,
		images: cloneDeep(
			optData.files.map((file) => {
				return { ...file, content: file.content.split(",")[1] };
			}),
		),
		is_publish_in_my_feed: true,
	};

	if (optData.id !== createModalUserValue.id) {
		body.ids_group = [+optData.id];
		body.is_publish_in_my_feed = false;
		delete body.show_in_article_feed;
	}

	if (optData.avatar?.content) body.title_image = optData.avatar;

	const response = await createSingleEvent(body);
	const data = await response.json();
	return normalizeApiResponse(data);
});
