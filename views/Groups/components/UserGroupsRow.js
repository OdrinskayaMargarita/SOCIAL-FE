import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { joinGroup } from "store/thunks/group.thunks";

import { changeGroupListData } from "store/reducers/group.reducer";
import Avatar from "../../../core-components/Avatar";

const UserGroupsRow = ({ country, city, avatar, members, feedStatistic, isFollowed, name, id }) => {
	const dispatch = useDispatch();
	const router = useRouter();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const onRowClicked = (groupId) => router.push(`/social/groups/${groupId}`);

	const onJoin = useCallback(
		async (event) => {
			event.stopPropagation();
			try {
				const {
					payload: { success },
				} = await dispatch(joinGroup(id));
				if (success) {
					dispatch(changeGroupListData({ key: "isFollowed", value: true, id }));
				}
			} catch (e) {
				console.error(e);
			}
		},
		[dispatch],
	);

	return (
		<Grid
			justifyContent="space-between"
			alignItems="center"
			sx={{
				p: 2,
				borderBottom: 1,
				borderColor: "divider",
				cursor: "pointer",
				":hover": { backgroundColor: "primary.hover" },
			}}
			container
			onClick={() => onRowClicked(id)}
		>
			<Grid item xs={6} display="flex">
				<Avatar src={avatar?.url} firstName={name} />
				<Box ml={1}>
					<Typography>{name}</Typography>
					<Typography>
						{city ? `${city},` : null} {country.name}
					</Typography>
				</Box>
			</Grid>
			<Grid item>
				<Typography>{members}</Typography>
			</Grid>
			<Grid item>
				<Typography>{feedStatistic?.total}</Typography>
			</Grid>
		</Grid>
	);
};

export default UserGroupsRow;
