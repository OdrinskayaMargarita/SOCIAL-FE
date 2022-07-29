import React, { useState } from "react";
import { FRIENDSLIST_TYPES } from "store/constants/users.constants";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { FriendsList } from "./FriendsList";

export const FriendsListSection = ({ user, id, title }) => {
	const { translation } = useSelector((state) => state.app);
	const entities = useSelector((state) => state.friends);
	const [activeTab, setActiveTab] = useState(true);

	const { entitiesInvations } = entities;

	const StyledBadge = styled(Badge)(({ theme }) => ({
		"& .MuiBadge-badge": {
			padding: "0 4px",
			margin: "0 4px 0 10px",
			background: activeTab ? "#3B59F5" : "#ffffff",
			color: activeTab ? "#ffffff" : "#000000",
		},
	}));

	return (
		<Box pt={2}>
			<Typography variant="h2" pl={3}>
				{title}
			</Typography>

			{!user?.friendStatus && (
				<Grid
					container
					spacing={3}
					py={2}
					ml={0}
					sx={{ borderBottom: "1px solid rgba(109, 144, 155, 0.2)", width: "100%" }}
				>
					<Grid item>
						<Button
							onClick={() => setActiveTab(true)}
							variant={!activeTab ? "lightGreyRounded" : "containedRounded"}
						>
							{translation?.["myProfile.tabs.friends.title"]}
						</Button>
					</Grid>
					<Grid item>
						<Button
							onClick={() => setActiveTab(false)}
							variant={activeTab ? "lightGreyRounded" : "containedRounded"}
							endIcon={<StyledBadge badgeContent={entitiesInvations?.length} max={100} showZero />}
						>
							<span style={{ paddingRight: "15px" }}>
								{translation?.["myProfile.tabs.friends.friendRequests"]}
							</span>
						</Button>
					</Grid>
				</Grid>
			)}

			<FriendsList
				friendsListType={
					activeTab ? FRIENDSLIST_TYPES.ALL_FRIENDS : FRIENDSLIST_TYPES.REQUEST_TO_FRIENDS
				}
				id={id}
				userCurrent={user}
			/>
		</Box>
	);
};
