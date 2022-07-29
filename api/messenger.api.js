import { API_URL } from "env";
import { authorizedRequest } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const fetchChatsList = async () =>
	authorizedRequest(`${API_URL}${API_ENDPOINTS.messenger.getChatslist}`, { method: "GET" });

export const createChat = async (resipientId) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.messenger.createChat}`);
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	};
	url.searchParams.append("id_recipient", Number(resipientId));
	return authorizedRequest(url, parameters);
};

export const fetchChat = async (recipientId, offset, limit) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.messenger.getMessagesList}`);
	url.searchParams.append("id_recipient", recipientId);
	url.searchParams.append("offset", offset);
	url.searchParams.append("limit", limit);

	return authorizedRequest(url);
};

export const sendMessageToChat = async (recipientId, text, attachmentId) => {
	const url = `${API_URL}${API_ENDPOINTS.messenger.sendMessage}`;
	const body = JSON.stringify({
		id_recipient: recipientId,
		id_attachment: attachmentId,
		text,
	});

	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};

	return authorizedRequest(url, parameters);
};

export const sendAttachmentToChat = async (recipientId, content) => {
	const url = `${API_URL}${API_ENDPOINTS.messenger.sendAttachment}`;
	const body = JSON.stringify({
		// id_recipient: recipientId,
		type: "IMAGE",
		file_name: content.filename,
		// id_message: 136,
		content,
	});
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	};

	return authorizedRequest(url, parameters);
};

export const readAllMessages = async (chatId) => {
	const url = `${API_URL}${API_ENDPOINTS.messenger.readAll}?id_chat=${chatId}`;
	const parameters = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	};

	return authorizedRequest(url, parameters);
};
