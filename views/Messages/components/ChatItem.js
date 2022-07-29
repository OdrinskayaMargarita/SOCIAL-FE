import React, { useMemo, useCallback, useEffect } from "react";
import moment from "moment";

import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import { calculateInitialLanguage } from "i18n/utils";
import "moment/locale/ru";
import Box from "@mui/material/Box";
import Avatar from "../../../core-components/Avatar";

const OnlineBadge = styled.div`
	width: 10px;
	margin-left: 10px;
	height: 10px;
	border-radius: 50%;
	background: #26bf3f;
	display: inline-block;
`;

const StyledTextMessage = styled(Typography)`
	display: -webkit-box;
	text-overflow: ellipsis;
	overflow: hidden;
	max-width: 100%;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`;

const ChatItem = ({ data, onClick }) => {
	const {
		recipient: { firstname, lastname, id },
		lastMessage,
	} = data;
	const sendingTime = lastMessage.createTimestamp
		? moment.unix(lastMessage.createTimestamp).locale(calculateInitialLanguage()).from()
		: "";

	const isUnread = useMemo(() => {
		return data.unreadMessages > 0;
	}, [data]);

	const handleClick = useCallback(() => {
		onClick(id);
	}, [onClick]);

	return (
		<Box
			onClick={handleClick}
			sx={{
				borderTop: "1px solid rgba(109, 144, 155, 0.2)",
				cursor: "pointer",
				backgroundColor: isUnread ? "rgba(59, 89, 245, 0.05)" : "white",
				padding: { xs: "12px", lg: "20px" },
			}}
		>
			<Grid container col={12} spacing={1} justifyContent="space-between">
				<Grid item container xs={9} sm={8} spacing={2} wrap="nowrap">
					<Grid item>
						<Avatar
							src={data.recipient.avatar?.url}
							firstName={data.recipient.firstname}
							lastName={data.recipient.lastname}
							isMember={data.recipient?.isMember}
							alt=""
						/>
					</Grid>
					<Grid item>
						<Typography>
							{`${firstname} ${lastname}`}
							{data.recipient.isOnline && <OnlineBadge />}
						</Typography>
						<StyledTextMessage>
							{data.lastMessage?.attachment
								? data.lastMessage?.attachment?.original_name
								: data.lastMessage?.text}
						</StyledTextMessage>
					</Grid>
				</Grid>
				<Grid item xs={3} sm={4}>
					<Box
						sx={{
							textAlign: "right",
							color: "#748893",
							fontSize: "14px",
						}}
					>
						<Typography
							sx={{
								fontWeight: "400",
								fontSize: { xs: "12px", md: "14px" },
								color: " 748893",
								marginBottom: 1,
							}}
						>
							{sendingTime}
						</Typography>
						{data.unreadMessages > 0 && (
							<Typography
								sx={{
									textAlign: "center",
									marginLeft: "auto",
									color: "#fff",
									fontSize: "14px",
									lineHeight: "20px",
									background: "#3b59f5",
									borderRadius: "50%",
									width: "20px",
									height: " 20px",
								}}
							>
								{data.unreadMessages}
							</Typography>
						)}
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ChatItem;
