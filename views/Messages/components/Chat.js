import React, { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "components/common";
import Button from "@mui/material/Button";
import { Grid, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ArrowUpward } from "@mui/icons-material";
import ChatMessage from "./Message";

import useFileReader from "../../../hooks/useFilereader";
import { readAllMessages } from "../../../api/messenger.api";
import Avatar from "../../../core-components/Avatar";
import { getChatsList } from "../../../store/thunks/messenger.thunks";

const CustomOnline = styled.span`
	width: 14px;
	height: 14px;
	background: #26bf3f;
	display: block;
	border-radius: 50%;
`;

const CustomFileName = styled.p`
	margin-top: 20px;
	display: flex;
	align-items: center;
	span {
		margin-left: 10px;
	}
	button {
		background: none;
		border: none;
		white-space: nowrap;
	}
`;

const ContainerInputSend = styled.div`
	padding: 20px;
	border-top: 1px solid rgba(109, 144, 155, 0.2);
	bottom: 0;
	position: sticky;
	background: #ffffff;
	@media (max-width: 1279px) {
		bottom: 56px;
	}
	.MuiInputBase-root {
		background: rgba(109, 144, 155, 0.1);
		border-radius: 8px;
		padding: 0;
		input {
			padding: 10px 14px;
		},
	},
`;

const Chat = ({
	chat,
	onBack,
	clearChat,
	recipient,
	sendMessage,
	fetchMessages,
	sendJsonMessage,
	attachFile,
	chatId,
	currentChat,
}) => {
	const [{ result, file }, setFile, clearFile] = useFileReader({
		method: "readAsDataURL",
	});
	const router = useRouter();
	const dispatch = useDispatch();
	const { translation } = useSelector((state) => state.app);
	const hiddenFileInput = React.useRef(null);
	const [messageText, setMessageText] = useState("");
	const { messages } = chat;
	const handleClick = (event) => {
		hiddenFileInput.current.click();
	};

	const handleChange = ({ target }) => {
		setFile(target.files[0]);
	};

	useEffect(async () => {
		const response = await readAllMessages(currentChat);
		dispatch(getChatsList());
	}, []);

	useEffect(async () => {
		const filename = file?.name || null;
		const fileContent = result ? result.split(",")[1] : null;
		const content = {
			filename: file?.name,
			content: fileContent,
		};
		if (file?.name && content.content) {
			attachFile(content);
		}
	}, [file, result]);

	const handleSend = ({ type, keyCode }) => {
		if ((type === "keyup" && keyCode === 13) || type === "click") {
			if (!(messageText?.length || result?.length)) {
				setMessageText("");
				clearFile();
				return;
			}
			sendMessage(messageText);
			clearFile();
			setMessageText("");
		}
	};

	useEffect(() => {
		return () => {
			clearChat();
		};
	}, []);

	const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

	return (
		<>
			{recipient ? (
				<>
					<Grid
						container
						alignItems="center"
						p={{ xs: 1, md: 2 }}
						sx={{
							borderBottom: 1,
							borderColor: "divider",
							position: "sticky",
							top: 0,
							background: "#fff",
							zIndex: 2,
						}}
					>
						<Grid item xs={2} sm={2} md={2} lg={12}>
							<Button
								onClick={onBack}
								variant="social-black"
								sx={{ marginBottom: isDesktop ? "24px" : 0 }}
								startIcon={<ArrowBackIcon />}
							>
								{isDesktop && translation?.["chat.btnBack"]}
							</Button>
						</Grid>
						<Grid item xs={10} sm={10} md={9} lg={12}>
							<Box
								sx={{
									cursor: "pointer",
								}}
								onClick={() => router.push(`/social/users/${recipient.id}`)}
							>
								<Grid container alignItems="center" spacing={2}>
									<Grid item>
										<Avatar
											src={recipient.avatar?.url}
											firstName={recipient.firstname}
											lastName={recipient.lastname}
											isMember={recipient.isMember}
											alt=""
										/>
									</Grid>
									<Grid item>
										<Typography
											variant={isDesktop ? "h2" : "h3"}
										>{`${recipient.firstname} ${recipient.lastname}`}</Typography>
									</Grid>
									{recipient?.isOnline && (
										<Grid item>
											<CustomOnline />
										</Grid>
									)}
								</Grid>
							</Box>
						</Grid>
					</Grid>

					<Box
						sx={{
							padding: { xs: "20px 20px 60px", md: "20px 20px 0" },
							display: "flex",
							flexDirection: "column-reverse",
							overflow: "auto",
							height: "100%",
						}}
						id="messages-container"
					>
						<InfiniteScroll
							dataLength={messages?.length || 0}
							loader={<h4> Loading</h4>}
							hasMore={chat.hasMore}
							inverse
							next={fetchMessages}
							initialScrollY={100}
							scrollableTarget="messages-container"
							style={{
								display: "flex",
								flexDirection: "column-reverse",
							}}
						>
							{messages?.map((message, index) => (
								<ChatMessage key={index} sendJsonMessage={sendJsonMessage} {...message} />
							))}
						</InfiniteScroll>
					</Box>

					<ContainerInputSend>
						<Grid container justifyContent="space-between" alignItems="center" spacing={2}>
							<Grid item xs={10}>
								<TextField
									fullWidth
									onKeyUp={handleSend}
									value={messageText}
									onChange={(e) => setMessageText(e.target.value)}
									placeholder={translation?.["chat.enterMessagePlaceholder"]}
									InputProps={{
										endAdornment: (
											<InputAdornment position="start">
												<AttachFileIcon
													onClick={handleClick}
													fontSize="small"
													style={{ cursor: "pointer" }}
												/>
											</InputAdornment>
										),
									}}
								/>
								<input
									type="file"
									accept=".jpg,.png"
									ref={hiddenFileInput}
									onChange={handleChange}
									style={{ display: "none" }}
								/>
							</Grid>
							<Grid item xs={2}>
								<Button
									onClick={handleSend}
									disabled={!(messageText?.length || result?.length)}
									variant="contained"
									sx={{
										width: { xs: "36px", md: "100%" },
										minWidth: { xs: "36px", md: "initial" },
										padding: { xs: "5px", md: "10px 20px" },
										height: { xs: "36px", md: "100%" },
										borderRadius: { xs: "50%", md: 8 },
									}}
								>
									{isDesktop ? translation?.["chat.btnSend"] : <ArrowUpward fontSize="small" />}
								</Button>
							</Grid>
						</Grid>
						{file?.name && (
							<CustomFileName>
								<Typography>{file?.name}</Typography>
								<Button variant="subaction-button" onClick={() => clearFile()}>
									Remove file
								</Button>
							</CustomFileName>
						)}
					</ContainerInputSend>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Chat;
