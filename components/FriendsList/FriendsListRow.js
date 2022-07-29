import React, { useRef } from "react";
import { useRouter } from "next/router";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "@mui/material";
import Avatar from "../../core-components/Avatar";
import {
	acceptToFriends,
	fetchFriends,
	fetchFriendsInvitations,
	removeFromFriends,
} from "../../store/thunks/friends.thunks";
import { FRIENDSLIST_TYPES } from "../../store/constants/users.constants";
import { clearEntities } from "../../store/reducers/friends.reducer";
import { createUserChat } from "../../store/thunks/messenger.thunks";
import { ACCEPTABLE_ERROR_CODES as errorCodes } from "../../store/constants/messenger.constants";

// eslint-disable-next-line camelcase
const FriendsListRow = ({ isOnline, firstname, lastname, avatar, isMember, id, friend_status }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const ref = useRef(null);
	const { translation } = useSelector((state) => state.app);
	const { user } = useSelector((state) => state.auth);

	const onRowClicked = () => {
		if (user.id === id) {
			router.push("/profile");
		} else {
			router.push(`/social/users/${id}`);
		}
	};

	const onSendMessage = (event) => {
		event.stopPropagation();
		// @todo on send message logic
	};

	const { entities } = useSelector((state) => {
		return state.profile;
	});

	const writeMessage = async (event) => {
		try {
			const {
				payload: { success, error, data },
			} = await dispatch(createUserChat(id));
			if (success || (error && error.code === errorCodes.CHAT_ALREADY_EXISTS)) {
				router.push(`/messages?userId=${id}`);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const sendDeclineRequest = async (event) => {
		event.stopPropagation();
		try {
			await dispatch(removeFromFriends(id));
			dispatch(clearEntities());
			dispatch(fetchFriends(user.id));
			dispatch(fetchFriendsInvitations(user.id));
		} catch (e) {
			console.error(e);
		}
	};

	const sendAcceptRequest = async (event) => {
		event.stopPropagation();
		try {
			await dispatch(acceptToFriends(id));
			dispatch(clearEntities());
			dispatch(fetchFriends(user.id));
			dispatch(fetchFriendsInvitations(user.id));
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

	return (
		<Grid
			container
			justifyContent="space-between"
			padding={2}
			alignItems="flex-end"
			sx={{ borderBottom: "1px solid rgba(109, 144, 155, 0.2)" }}
		>
			<Grid
				item
				container
				xs={6}
				alignItems="center"
				onClick={() => onRowClicked()}
				sx={{ cursor: "pointer" }}
			>
				<Grid item marginRight={1}>
					<Avatar src={avatar?.url} firstName={firstname} lastName={lastname} isMember={isMember} />
				</Grid>
				<Grid item>
					<Typography>
						{firstname} {lastname}
					</Typography>
				</Grid>
			</Grid>
			<Grid container item xs={6} spacing={1} justifyContent="flex-end" alignItems="center">
				<Grid item>
					{/* eslint-disable-next-line camelcase */}
					{friend_status === FRIENDSLIST_TYPES.WAITING_ACCEPT ? (
						<Grid container spacing={2}>
							<Grid item>
								<Button onClick={sendAcceptRequest}>
									{translation?.["otherUserProfile.btnAccepFriend"]}
								</Button>
							</Grid>
							<Grid item>
								<Button onClick={sendDeclineRequest} variant="lightGrey">
									{translation?.["otherUserProfile.btnDeclineFriend"]}
								</Button>
							</Grid>
						</Grid>
					) : (
						<Grid container spacing={2}>
							<Button onClick={writeMessage} styleType="primary">
								{translation?.["otherUserProfile.btnSendMessage"]}
							</Button>

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
									horizontal: "950px",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "950x",
								}}
							>
								<Button ref={ref} onClick={sendDeclineRequest} variant="lightBlue">
									{translation?.["otherUserProfile.btnRemoveFriend"]}
								</Button>
							</Popover>
						</Grid>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default FriendsListRow;
