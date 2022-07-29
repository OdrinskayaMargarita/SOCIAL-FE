import React, { useCallback, useEffect } from "react";
import Badge from "@mui/material/Badge";

import { Loading } from "components/common";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "../../../core-components/Avatar";

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#26bf3f",
		color: "#fff",
		zIndex: "3",
		border: "1px solid #fff",
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			content: '""',
			zIndex: "3",
		},
	},
}));

const DivBedore = styled.div`
	position: relative;
	margin-left: -6px;
	z-index: 0;
	&:before {
		content: "";
		background: #3b59f5;
		width: 45px;
		height: 16px;
		position: absolute;
		left: -3px;
	}
`;
const StyledAvatarContainer = styled.div`
	border-radius: 50%;
	border: 3px solid #fff;
	z-index: 2;
	position: relative;
	.MuiAvatar-root {
		width: 32px;
		height: 32px;
	}
`;

const ChatThumbnail = ({ chatId, chat, onClick }) => {
	const {
		id,
		recipient: { avatar, isOnline, id: recipientId, firstname, lastname },
		unreadMessages,
	} = chat;

	const handleClick = () => {
		onClick(recipientId);
	};
	const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));

	return (
		<Grid
			container
			alignItems="center"
			onClick={handleClick}
			role="button"
			tabIndex={0}
			aria-hidden="true"
			marginBottom={isDesktop ? 1 : 0}
			marginRight={1}
			sx={{
				cursor: "pointer",
				minWidth: !isDesktop && unreadMessages > 0 ? "90px" : "auto",
			}}
		>
			<Grid item sx={{ position: "relative" }} alignItems="flex-end">
				{isOnline ? (
					<Box
						sx={{ borderRadius: "50%" }}
						border={chat.recipient.id === chatId ? "2px solid #3B59F5" : "2px solid transparent"}
					>
						<StyledBadge
							overlap="circular"
							anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
							variant="dot"
						>
							<StyledAvatarContainer>
								<Avatar src={avatar?.url} firstName={firstname} lastName={lastname} />
							</StyledAvatarContainer>
						</StyledBadge>
					</Box>
				) : (
					<Box
						border={chat.recipient.id === chatId ? "2px solid #3B59F5" : "2px solid transparent"}
						sx={{ borderRadius: "50%" }}
					>
						<StyledAvatarContainer>
							<Avatar src={avatar?.url} firstName={firstname} lastName={lastname} />
						</StyledAvatarContainer>
					</Box>
				)}
			</Grid>
			{unreadMessages > 0 && (
				<DivBedore>
					<Grid
						container
						item
						alignItems="center"
						justifyContent="center"
						sx={{
							background: "#3B59F5",
							borderRadius: "100px",
							color: "#fff",
							position: "absolute",
							right: "-55px",
							width: "49px",
							height: "32px",
							marginTop: "-16px",
						}}
					>
						<Grid item sx={{ marginBottom: "-3px", marginRight: "3px" }}>
							<EmailOutlinedIcon fontSize="14" />
						</Grid>
						<Grid item>
							<Typography>{unreadMessages}</Typography>
						</Grid>
					</Grid>
				</DivBedore>
			)}
		</Grid>
	);
};

const ChatListThumbnail = ({ chatId, chats, onChatClick }) => {
	const { translation } = useSelector((state) => state.app);

	return (
		<Box
			sx={{
				position: { xs: "fixed", lg: "absolute" },
				right: { xs: 0, lg: "-110px" },
				top: { xs: "calc(100% - 56px)", lg: "10px" },
				height: { xs: "56px", lg: "auto" },
				maxWidth: { xs: "100%", lg: "100px" },
				width: { xs: "100%", lg: "100%" },
				overflowX: { xs: "auto", lg: "hidden" },
				left: { xs: 0, lg: "auto" },
				backgroundColor: "#fff",
				display: { xs: "flex", lg: "block" },
				borderTop: { xs: "1px solid rgba(109, 144, 155, 0.5)", lg: 0 },
				alignItems: "center",
				justifyContent: "flex-start",
				padding: { xs: "0 12px", lg: 0 },
			}}
		>
			{chats?.length > 0 && (
				<>
					{chats.map((chat) => (
						<ChatThumbnail
							chatId={chatId}
							chat={chat}
							key={`chat-thumnail-${chat.id}`}
							onClick={onChatClick}
						/>
					))}
				</>
			)}
			{chats?.length === 0 && <Alert>{translation?.["myChats.noActiveChats"]}</Alert>}
			{!chats && <Loading />}
		</Box>
	);
};

export default ChatListThumbnail;
