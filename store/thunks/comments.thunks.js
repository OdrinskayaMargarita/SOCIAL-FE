import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSingleComment, fetchComments } from "api";

import { POST_COMMENT, GET_COMMENTS } from "store/actions/comments.actions";
import { normalizeApiResponse } from "utils/api.utils";

export const createComment = createAsyncThunk(POST_COMMENT, async ({ text, type, id }) => {
	const response = await createSingleComment({
		text,
		parent_type: type,
		id_parent: id,
	});
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const getComments = createAsyncThunk(GET_COMMENTS, async ({ id, type }, { getState }) => {
	const {
		comments: {
			data: { offset, limit },
		},
	} = getState();

	const response = await fetchComments({
		offset,
		limit,
		id_parent: id,
		parent_type: type,
	});
	const data = await response.json();

	return normalizeApiResponse(data);
});
