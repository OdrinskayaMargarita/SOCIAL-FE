import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { joinGroup, leaveGroup } from "store/thunks/group.thunks";
import { changeGroupData, changeGroupListData } from "store/reducers/group.reducer";
import {
	groupsMembersRole,
	inviteGroupButtonText,
	groupTypes,
} from "store/constants/groups.constants";
import Avatar from "../../../core-components/Avatar";

const AllGroupsListRow = ({
	country,
	city,
	avatar,
	members,
	feedStatistic,
	isFollowed,
	name,
	id,
	currentUserRole,
	type,
	isSystem,
}) => {
	const { translation } = useSelector((state) => state.app);
	const { itself: group } = useSelector((state) => state.group.data);
	const dispatch = useDispatch();
	const router = useRouter();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const onRowClicked = useCallback((groupId) => router.push(`/social/groups/${groupId}`), [router]);

	const handleFollowStatus = useCallback(
		async (event) => {
			event.stopPropagation();
			try {
				const action = isFollowed ? leaveGroup : joinGroup;
				const {
					payload: { success },
				} = await dispatch(action(id));
				if (success) {
					dispatch(changeGroupListData({ key: "isFollowed", value: !isFollowed, id }));
					if (isFollowed)
						dispatch(
							changeGroupListData({
								key: "currentUserRole",
								value: groupsMembersRole.REQUEST_REJECTED,
								id,
							}),
						);
					if (!isFollowed) {
						dispatch(
							changeGroupListData({
								key: "currentUserRole",
								value: groupTypes.PUBLIC
									? groupsMembersRole.MODERATOR
									: groupsMembersRole.REQUEST_SUBMITTED,
								id,
							}),
						);
					}
				}
			} catch (e) {
				console.error(e);
			}
		},
		[dispatch, isFollowed],
	);

	const isFollowDisabled = groupsMembersRole.OWNER === currentUserRole;

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
						{city ? `${city},` : null} {country?.name}
					</Typography>
				</Box>
			</Grid>
			<Grid item>
				<Typography>{members}</Typography>
			</Grid>
			<Grid item>
				<Typography>{feedStatistic?.total}</Typography>
			</Grid>
			<Grid item width="125px" display="flex" justifyContent="center">
				{isLoggedIn && !isSystem ? (
					<Button
						onClick={handleFollowStatus}
						disabled={isFollowDisabled}
						variant={currentUserRole ? "lightGrey" : "lightBlue"}
					>
						{currentUserRole
							? translation[inviteGroupButtonText[currentUserRole]]
							: translation?.["group.join"]}
					</Button>
				) : null}
			</Grid>
		</Grid>
	);
};

export default AllGroupsListRow;
