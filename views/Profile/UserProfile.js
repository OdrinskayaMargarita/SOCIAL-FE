import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { clearUserData } from "store/reducers/users.reducer";
import { getUserData } from "store/thunks/users.thunks";
import { createUserChat } from "store/thunks/messenger.thunks";
import { ACCEPTABLE_ERROR_CODES as errorCodes } from "store/constants/messenger.constants";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Loading } from "components/common";
import styled from "@emotion/styled";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { FRIEND_STATUS } from "../../store/constants/users.constants";
import SectionTabs from "../../components/Sections/SectionTabs";
import TabsPanel from "./components/ProfileDetails/TabsPanel";
import Layout from "../../core-components/Layout/Layout";
import background from "../../styles/images/member-background.png";
import Avatar from "../../core-components/Avatar";
import ItemHeaderBack from "../../components/common/ItemHeader/Back";
import backgroundCooperator from "../../styles/images/cooperator-background.png";
import { addToFriends, removeFromFriends } from "../../store/thunks/friends.thunks";

const BigAvatar = styled.div`
	border-radius: 50%;
	width: 160px;
	height: 160px;
	border: 2px solid #fff;
	z-index: 1;

	.MuiAvatar-root {
		width: 100%;
		height: 100%;
	}
`;

const AvatarContainer = styled.div`
	margin-top: -60px;
	margin-right: 25px;
`;

const ContainerHeaderProfile = styled.div`
	display: grid;
	grid-template-columns: 25% 75%;
	margin-top: -40px;
	padding: 20px;
`;

const ContainerTitleButtonProfile = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	h2 {
		display: flex;
		align-items: center;
	}
`;

const ContainerInfoProfile = styled.div`
	width: 100%;
`;

const StatusOnline = styled.div`
	width: 13px;
	height: 13px;
	border-radius: 50%;
	background: #26bf3f;
	margin-left: 12px;
`;

const ProfileAbout = styled.div`
	p {
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		margin-bottom: 24px;
	}
`;
const ListProfile = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
`;

const ListItem = styled.div`
	display: flex;
	align-items: center;
	color: #748893;
	gap: 2px;
	span {
		margin-left: 5px;
	}
`;
const ContainerTopProfile = styled.div`
	padding-top: 250px;
	position: relative;
`;
const CircleIcon = styled.div`
	height: 3px;
	width: 3px;
	border-radius: 50%;
	background-color: #748893;
`;
const ImageBackground = styled.div`
	position: absolute;
	top: -16px;
	height: 215px;
	width: 100%;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const UserProfile = () => {
	const dispatch = useDispatch();
	const { translation } = useSelector((state) => state.app);
	const { isLoggedIn, user } = useSelector((state) => state.auth);
	const users = useSelector((state) => state.users.data?.itself);
	const router = useRouter();
	const [nameOfButtonAddFriend, setNameOfButtonAddFriend] = useState();
	const {
		query: { id },
	} = router;

	const getCurrentStatus = () => {
		switch (users?.friendStatus) {
			case FRIEND_STATUS.WAITING_ACCEPT:
				return setNameOfButtonAddFriend(translation?.["otherUserProfile.waitingForAccept"]);
			case FRIEND_STATUS.ACCEPTED:
				return setNameOfButtonAddFriend(translation?.["otherUserProfile.btnRemoveFriend"]);
			case FRIEND_STATUS.NOT_FRIENDS:
			case FRIEND_STATUS.RECIPIENT_DECLINED:
			case FRIEND_STATUS.REQUESTER_DECLINED:
				return setNameOfButtonAddFriend(translation?.["otherUserProfile.btnAddFriend"]);
			default:
				return setNameOfButtonAddFriend(translation?.["otherUserProfile.btnAddFriend"]);
		}
	};

	useEffect(() => {
		if (translation && users) getCurrentStatus();
	}, [users, translation]);

	useEffect(() => {
		dispatch(getUserData(id));
		return () => {
			dispatch(clearUserData());
		};
	}, [dispatch]);

	const writeMessage = async () => {
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

	const sendRequest = async (event) => {
		event.stopPropagation();
		try {
			getCurrentStatus();
			if (users?.friendStatus !== "ACCEPTED") {
				await dispatch(addToFriends(users?.id));
			} else {
				await dispatch(removeFromFriends(users?.id));
			}
			await dispatch(getUserData(id));
		} catch (e) {
			console.error(e);
		}
	};

	const Circle = () => (
		<Box
			sx={{
				width: "16px",
				height: "16px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CircleIcon />
		</Box>
	);

	return (
		<Layout>
			{users ? (
				<>
					<Box sx={{ padding: "0 20px", marginBottom: "30px" }}>
						<ItemHeaderBack tab="users" />
					</Box>
					<ContainerTopProfile>
						<ImageBackground>
							{users.isMember ? (
								<img src={backgroundCooperator.src} alt="" />
							) : (
								<img src={background.src} alt="" />
							)}
						</ImageBackground>
						<ContainerHeaderProfile>
							<AvatarContainer>
								<BigAvatar>
									<Avatar
										src={users.avatar?.url}
										firstName={users.firstname}
										lastName={users.lastname}
										isMember={users.isMember}
										bigAvatar
									/>
								</BigAvatar>
							</AvatarContainer>
							<ContainerInfoProfile>
								<ContainerTitleButtonProfile>
									<Typography variant="h2">
										{users.firstname} {users.lastname} {users.isOnline ? <StatusOnline /> : null}
									</Typography>
									{isLoggedIn && (
										<Button
											variant="lightBlue"
											onClick={sendRequest}
											disabled={users?.friendStatus === FRIEND_STATUS.WAITING_ACCEPT}
										>
											{nameOfButtonAddFriend}
										</Button>
									)}
								</ContainerTitleButtonProfile>

								<Typography variant="h3" color="primary.lightblue">
									{users.isMember
										? translation?.["myProfile.currentRole_cooperator"]
										: translation?.["myProfile.currentRole_member"]}
								</Typography>

								<ProfileAbout>
									<Typography>{users.about}</Typography>
								</ProfileAbout>

								<ListProfile>
									<ListItem>
										<PersonOutlineIcon fontSize="8px" />
										<Typography> {users.friendsStatistic?.friendsCount}</Typography>
									</ListItem>
									<Circle />
									<ListItem>
										<NewspaperIcon fontSize="8px" />
										<Typography> {users?.feedStatistic?.posts}</Typography>{" "}
									</ListItem>
									<Circle />
									<ListItem>
										<StarBorderIcon fontSize="8px" />
										<Typography> {users?.feedStatistic?.events}</Typography>{" "}
									</ListItem>
									<Circle />
									<ListItem>
										<TipsAndUpdatesIcon fontSize="8px" />
										<Typography>{users?.feedStatistic?.votings}</Typography>
									</ListItem>
								</ListProfile>
							</ContainerInfoProfile>
						</ContainerHeaderProfile>
						{isLoggedIn && (
							<Box sx={{ padding: "20px 20px 0 20px" }}>
								<Button onClick={writeMessage} sx={{ width: "100%" }}>
									{translation?.["otherUserProfile.btnSendMessage"]}
								</Button>
							</Box>
						)}
					</ContainerTopProfile>
					<SectionTabs>
						<TabsPanel user={users} showContactsDescription />
					</SectionTabs>
				</>
			) : (
				<Loading />
			)}
		</Layout>
	);
};

export default UserProfile;
