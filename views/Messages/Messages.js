import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
	reset,
	clearActiveChat,
	updateActiveChat,
	updateLastMessage,
} from "store/reducers/messenger.reducer";
import {
	getChatsList,
	fetchActiveChat,
	sendMessage,
	sendAttachedFile,
} from "store/thunks/messenger.thunks";

import useTgWebsocket from "hooks/useTgWebSocket";

import { SOCKET_MESSAGE_TYPES } from "store/constants/messenger.constants";

import Box from "@mui/material/Box";
import { Chat, ChatList, ChatListThumbnail } from "./components";
import { SmartLayout } from "../../components";

const MessagesView = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [chatId, setChatId] = useState(Number(router.query.userId) || null);
	const [imageId, setImageId] = useState(null);
	const [currentChat, setCurrentChat] = useState(null);

	const userId = useSelector((state) => state.auth.user.id);
	const { chats, activeChat } = useSelector((state) => state.messenger);

	const recipientUser = useMemo(() => {
		if (chats) {
			const activeChatData = chats.find(({ recipient }) => recipient.id === chatId);
			if (activeChatData) {
				setCurrentChat(activeChatData.id);
				return activeChatData.recipient;
			}
		}
		return null;
	}, [chatId, chats]);

	const { sendSocketMessage, lastMessage, sendJsonMessage } = useTgWebsocket();

	const clearChat = useCallback(() => {
		dispatch(clearActiveChat());
	}, []);

	const handleChatClick = (id) => {
		if (id !== chatId) {
			clearChat();
			setChatId(id);
		}
	};

	const closeActiveChat = useCallback(() => {
		setChatId(null);
	}, []);

	const sendMessageToChat = async (text) => {
		if (text.length) {
			await dispatch(
				sendMessage({
					recipientId: chatId,
					text,
				}),
			).then(
				({ payload }) =>
					payload.success && dispatch(updateActiveChat({ data: payload.data, userId })),
			);
		}
		if (imageId) {
			await dispatch(
				sendMessage({
					id_attachment: imageId,
					recipientId: chatId,
					text,
				}),
			).then(
				({ payload }) =>
					payload.success && dispatch(updateActiveChat({ data: payload.data, userId })),
			);
			setImageId(null);
		}
	};

	const sendAttachFile = async (content) => {
		await dispatch(
			sendAttachedFile({
				recipientId: chatId,
				content,
			}),
		).then(({ payload }) => setImageId(payload.id));
	};

	const fetchMessages = (chat = false) => {
		if (chatId !== null) {
			const object = {
				chatId,
				currentChat: chat,
			};
			dispatch(fetchActiveChat(object));
		}
	};

	useEffect(() => {
		dispatch(getChatsList());
		return () => {
			dispatch(reset());
		};
	}, []);

	useEffect(() => {
		fetchMessages();
		if (!chatId) {
			dispatch(getChatsList());
		}
	}, [dispatch, chatId]);

	useEffect(() => {
		if (lastMessage) {
			const { type, data } = lastMessage;
			if (type === SOCKET_MESSAGE_TYPES.NEW_MESSAGE) {
				if (chatId) {
					dispatch(updateActiveChat({ data, userId }));
				} else {
					dispatch(updateLastMessage({ data }));
				}
			}
			if (type === SOCKET_MESSAGE_TYPES.CHAT_CREATED) {
				dispatch(fetchMessages());
			}
		}
	}, [lastMessage]);

	return (
		<SmartLayout>
			<Box
				sx={{
					flexGrow: "1",
					display: "flex",
					flexDirection: "column",
					width: "100%",
					height: "100vh",
				}}
			>
				{chatId ? (
					<Chat
						chat={activeChat}
						clearChat={clearChat}
						onBack={closeActiveChat}
						recipient={recipientUser}
						sendMessage={sendMessageToChat}
						fetchMessages={() => fetchMessages(true)}
						sendJsonMessage={sendJsonMessage}
						attachFile={sendAttachFile}
						chatId={chatId}
						currentChat={currentChat}
					/>
				) : (
					<ChatList chats={chats} onChatClick={handleChatClick} />
				)}
			</Box>
			<ChatListThumbnail chatId={chatId} chats={chats} onChatClick={handleChatClick} />
		</SmartLayout>
	);
};

export default MessagesView;
