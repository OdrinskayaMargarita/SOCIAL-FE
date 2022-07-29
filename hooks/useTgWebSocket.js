import React, { useState, useCallback, useEffect } from "react";
import useWebSocket from "react-use-websocket";

import { WEBSOCKET_URL } from "env";
import { getUserToken } from "utils/auth.utils";

const EVENTS = {
	MESSAGE: "NEW_MESSAGE",
	READ: "READ_MESSAGE",
	CHAT: "CHAT_CREATED",
};

const useTgWebsocket = () => {
	const [receivedMessage, setReceivedMessage] = useState(null);
	const { sendMessage, lastMessage, readyState, sendJsonMessage } = useWebSocket(
		`${WEBSOCKET_URL}/messenger`,
		{
			queryParams: {
				token: getUserToken(),
			},
		},
	);
	useEffect(() => {
		if (lastMessage && lastMessage.data) {
			const data = JSON.parse(lastMessage.data);
			setReceivedMessage(data);
		}
	}, [lastMessage]);

	return { lastMessage: receivedMessage, sendSocketMessage: sendMessage, sendJsonMessage };
};

export default useTgWebsocket;
