/* eslint-disable no-param-reassign */
import { createSlice, current } from "@reduxjs/toolkit";
import get from "lodash/fp/get";

import { normalizeChatsData, normalizeMessagesData, normalizeMessage } from "utils/messenger.utils";
import { getChatsList, createUserChat, fetchActiveChat } from "../thunks/messenger.thunks";

import { DEFAULT_MESSAGES_LIMIT } from "../constants/pagination.constants";

const initialState = {
	chats: null,
	activeChat: {
		messages: [],
		offset: 0,
		limit: DEFAULT_MESSAGES_LIMIT,
		hasMore: true,
	},
};

const messengerSlice = createSlice({
	name: "messenger",
	initialState,
	reducers: {
		reset: () => initialState,
		clearActiveChat: (state) => {
			state.activeChat = initialState.activeChat;
		},
		chooseActiveChat: (state, { payload }) => {
			state.activeChat = initialState.activeChat;
		},
		updateActiveChat: (state, { payload }) => {
			const { data, userId } = payload;
			state.activeChat.messages = [normalizeMessage(data, userId), ...state.activeChat.messages];
		},
		updateLastMessage: (state, { payload }) => {
			const { data } = payload;
			const searchingChatId = get("chat_id", data);
			const updatedChats = state.chats.map((chat) => {
				if (chat.id === searchingChatId) {
					chat.lastMessage = normalizeMessage(data);
					chat.unreadMessages += 1;
				}
				return chat;
			});
			state.chats = updatedChats;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getChatsList.fulfilled, (state, { payload }) => {
			state.chats = normalizeChatsData(payload.data);
		});
		builder.addCase(fetchActiveChat.fulfilled, (state, { payload }) => {
			const { offset, limit } = state.activeChat;
			const { messages = [], total, userId, currentChat } = payload.data;
			const messagesList = currentChat
				? [...state.activeChat.messages, ...normalizeMessagesData(messages, userId)]
				: [...normalizeMessagesData(messages, userId)];
			state.activeChat = {
				messages: messagesList,
				offset: offset + limit,
				limit,
				hasMore: offset + messages.length < total,
			};
		});
	},
});

export const { reset, clearActiveChat, updateActiveChat, updateLastMessage, chooseActiveChat } =
	messengerSlice.actions;

export default messengerSlice;
