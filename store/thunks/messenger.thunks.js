import { createAsyncThunk } from "@reduxjs/toolkit";
import set from "lodash/fp/set";
import { normalizeApiResponse } from "utils/api.utils";
import { fetchChatsList, createChat, fetchChat, sendMessageToChat } from "api";

import {
	FETCH_CHATS_LIST,
	CREATE_CHAT,
	FETCH_CHAT,
	SEND_MESSAGE,
	ATTACH_FILE,
} from "../actions/messenger.actions";
import { sendAttachmentToChat } from "../../api/messenger.api";

export const getChatsList = createAsyncThunk(FETCH_CHATS_LIST, async () => {
	const response = await fetchChatsList();
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const createUserChat = createAsyncThunk(CREATE_CHAT, async (recipientId) => {
	const response = await createChat(recipientId);
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const fetchActiveChat = createAsyncThunk(FETCH_CHAT, async (object, { getState }) => {
	const {
		messenger: {
			activeChat: { offset, limit },
		},
		auth: { user },
	} = getState();
	const offsetValue = object.currentChat ? offset : 0;
	const response = await fetchChat(object.chatId, offsetValue, limit);
	const data = await response.json();
	data.data.currentChat = object.currentChat;
	return normalizeApiResponse(set(["data", "userId"], user.id, data));
});

export const sendMessage = createAsyncThunk(SEND_MESSAGE, async (messageData) => {
	// eslint-disable-next-line camelcase
	const { recipientId, text, id_attachment } = messageData;
	const response = await sendMessageToChat(recipientId, text, id_attachment);
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const sendAttachedFile = createAsyncThunk(ATTACH_FILE, async (messageData) => {
	const { recipientId, content } = messageData;
	const response = await sendAttachmentToChat(recipientId, content);
	const data = await response.json();
	return data;
});
