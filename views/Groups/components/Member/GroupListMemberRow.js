import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Grid, Typography } from "@mui/material";
import Avatar from "core-components/Avatar";
import { useSelector } from "react-redux";
import techGenImage from "../../../../styles/images/tech-gen-icon.svg";
import { API_URL } from "../../../../env";

const GroupListMemberRow = ({
	avatar,
	firstname,
	lastname,
	isMember,
	isOnline,
	friends_statistic: friendsStatistic,
	feedStatistic,
	id,
}) => {
	const router = useRouter();

	const data = useSelector((state) => state.auth);

	const onRowClicked = () => {
		if (data.user.id === id) {
			router.push("/profile");
		} else {
			router.push(`/social/users/${id}`);
		}
	};

	return (
		<Grid
			container
			onClickCapture={() => onRowClicked()}
			sx={{
				padding: "10px 20px",
				borderTop: "1px solid #e1e9eb",
			}}
		>
			<Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
				<Box>
					<Avatar src={avatar?.url ? avatar.url : null} firstName={firstname} lastName={lastname} />
					{isMember ? (
						<div>
							<Avatar src={techGenImage.src} />
						</div>
					) : null}
				</Box>
				<Typography ml={2}>
					{firstname} {lastname}
				</Typography>
				{isOnline && (
					<Box
						sx={{
							width: "9px",
							height: "9px",
							borderRadius: "50%",
							backgroundColor: "#26BF3F",
							marginLeft: 1,
						}}
					/>
				)}
			</Grid>
			<Grid
				item
				xs={2}
				sx={{ textAlign: "end", display: "flex", alignItems: "center", justifyContent: "flex-end" }}
			>
				<Typography>{feedStatistic?.total}</Typography>
			</Grid>
		</Grid>
	);
};

export default GroupListMemberRow;
