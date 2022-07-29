import React, { useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getGroups, joinGroup, leaveGroup } from "store/thunks/group.thunks";

import { changeGroupData, changeGroupListData, clearEntities } from "store/reducers/group.reducer";
import Avatar from "core-components/Avatar";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Popover } from "@mui/material";

const ProfileGroupsRow = ({ country, city, avatar, name, id, owner, userId }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const ref = useRef(null);

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const { translation } = useSelector((state) => state.app);
	const onRowClicked = (groupId) => router.push(`/social/groups/${groupId}`);

	const onJoin = async (event) => {
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
	};

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const idPop = open ? "simple-popover" : undefined;

	const handleFollowStatus = async () => {
		try {
			const {
				payload: { success },
			} = await dispatch(leaveGroup(id));
			dispatch(clearEntities());
			dispatch(getGroups({ userId }));
			if (success) {
				dispatch(changeGroupData({ key: "isFollowed", value: false, id }));
			}
		} catch (e) {
			console.error(e);
		}
	};

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
		>
			<Grid item xs={6} container onClick={() => onRowClicked(id)}>
				<Grid item>
					<Avatar src={avatar?.url} firstName={name} />
				</Grid>
				<Grid item>
					<Box ml={1}>
						<Grid container>
							<Typography sx={{ fontWeight: "500" }}>{name}</Typography>
							{owner.id === userId && (
								<Typography ml={1} sx={{ opacity: "0.5" }}>
									({translation?.["myProfile.tabs.groups.myRoleInGroup"]})
								</Typography>
							)}
						</Grid>
						<Typography>
							{city && `${city},`} {country.name}
						</Typography>
					</Box>
				</Grid>
			</Grid>
			<Grid item>
				{owner.id === userId && (
					<>
						<Button
							aria-describedby={id}
							variant="subaction-button"
							onClick={handleClick}
							startIcon={<MoreHorizIcon />}
						/>
						<Popover
							id={idPop}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "bottom",
							}}
							transformOrigin={{
								vertical: "top",
							}}
						>
							<Button ref={ref} onClick={handleFollowStatus} variant="lightBlue">
								{translation?.["group.leave"]}
							</Button>
						</Popover>
					</>
				)}
			</Grid>
		</Grid>
	);
};

export default ProfileGroupsRow;
