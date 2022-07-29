import get from "lodash/fp/get";
import omit from "lodash/fp/omit";
import set from "lodash/fp/set";
import isNil from "lodash/fp/isNil";

import { API_URL } from "env";
import has from "lodash/fp/has";

export const normalizeChatData = (data) => {
	const recipient = get("recipient", data);
	const lastMessage = get("last_message", data);
	const unreadMessages = get("unread_messages", data);
	return {
		id: data.id,
		recipient: {
			...omit(["is_online", "is_member", "avatar"], recipient),
			isOnline: get("is_online", recipient),
			isMember: get("is_member", recipient),
			avatar: !isNil(get("avatar", recipient))
				? {
						filename: get(["avatar", "filename"], recipient),
						url: `${API_URL}/${get(["avatar", "url"], recipient)}`,
				  }
				: null,
		},
		lastMessage: {
			...omit(
				["chat_id", "owner_id", "is_deleted", "create_timestamp", "attachments"],
				lastMessage,
			),
			chatId: get("chat_id", lastMessage),
			ownerId: get("owner_id", lastMessage),
			isDeleted: get("is_deleted", lastMessage),
			createTimestamp: get("create_timestamp", lastMessage),
			attachments: {
				name: get(["attachments", "original_name"], lastMessage),
			},
		},
		unreadMessages,
	};
};

const aggregateAttachment = (message) => {
	const { attachment } = message;
	return has("url", attachment)
		? set("url", `${API_URL}${attachment.url}`, attachment)
		: attachment;
};

export const normalizeMessage = (message, userId) => {
	return {
		text: get("text", message),
		attachment: aggregateAttachment(message),
		isOwn: get("owner_id", message) === userId,
		createTimestamp: get("create_timestamp", message),
		chatId: get("chat_id", message),
		isDeleted: get("is_deleted", message),
		id: get("id", message),
	};
};

export const checkIsMessageLast = (currentMessage, nextMessage) => {
	return !nextMessage || get("owner_id", currentMessage) !== get("owner_id", nextMessage);
};

export const normalizeMessagesData = (messages = [], userId) => {
	return messages.map((message, index) => {
		return normalizeMessage(message, userId);
	});
};

export const normalizeChatsData = (data) => {
	return data ? data.map(normalizeChatData) : [];
};
