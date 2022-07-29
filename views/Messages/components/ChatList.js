import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";

import { Loading } from "components/common";

import { InputBase } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import ChatItem from "./ChatItem";

const ChatList = ({ chats, onChatClick }) => {
	const { t } = useTranslation();

	return (
		<div>
			<Box p={2}>
				<Typography variant="h2" mb={{ md: 0, lg: "20px" }}>
					{t("messages.generic.myChats")}
				</Typography>
				{/* <InputBase */}
				{/*	fullWidth */}
				{/*	placeholder="Поиск по имени" */}
				{/*	startAdornment={ */}
				{/*		<InputAdornment position="start"> */}
				{/*			<SearchIcon /> */}
				{/*		</InputAdornment> */}
				{/*	} */}
				{/* /> */}
			</Box>

			{chats &&
				chats.length > 0 &&
				chats.map((item) => <ChatItem key={item.id} data={item} onClick={onChatClick} />)}

			{chats && chats.length === 0 && <Alert>{t("messages.generic.noData")}</Alert>}
			{!chats && <Loading />}
		</div>
	);
};

export default ChatList;
