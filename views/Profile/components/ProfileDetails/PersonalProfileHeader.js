import React from "react";
import { Button } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import styled from "@emotion/styled";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Avatar from "../../../../core-components/Avatar";
import background from "../../../../styles/images/member-background.png";
import backgroundCooperator from "../../../../styles/images/cooperator-background.png";

const BigAvatar = styled.div`
	border-radius: 50%;
	width: 160px;
	height: 160px;
	border: 2px solid #fff;
	z-index: 1;
	position: relative;

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
const ListProfile = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
`;

const ListItem = styled.div`
	display: flex;
	align-items: center;
	color: #748893;
	gap: 5px;
	margin-right: 5px;
	span {
		margin-left: 5px;
	}
`;
const ContainerTopProfile = styled.div`
	padding-top: 215px;
	position: relative;
`;
const ImageBackground = styled.div`
	position: absolute;
	top: 0;
	height: 215px;
	width: 100%;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
const CircleIcon = styled.div`
	height: 3px;
	width: 3px;
	border-radius: 50%;
	background-color: #748893;
`;

const PersonalProfileHeader = ({ user, changeMode }) => {
	const { translation } = useSelector((state) => state.app);

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
		<ContainerTopProfile>
			<ImageBackground>
				{user.isMember ? (
					<img src={backgroundCooperator.src} alt="" />
				) : (
					<img src={background.src} alt="" />
				)}
			</ImageBackground>
			<ContainerHeaderProfile>
				<AvatarContainer>
					<BigAvatar>
						<Avatar
							src={user.avatar?.url}
							firstName={user.firstname}
							lastName={user.lastname}
							isMember={user.isMember}
							bigAvatar
						/>
					</BigAvatar>
				</AvatarContainer>

				<ContainerInfoProfile>
					<ContainerTitleButtonProfile>
						<Typography variant="h2">
							{user.firstname} {user.lastname} {user.isOnline ? <StatusOnline /> : null}
						</Typography>
						<Button variant="grey" onClick={changeMode}>
							{translation?.["myProfile.btnEdit"]}
						</Button>
					</ContainerTitleButtonProfile>

					<Typography mb={3} color="primary.lightblue">
						{user.isMember
							? translation?.["authorization_menu.cooperator_status_cooperator"]
							: translation?.["authorization_menu.cooperator_status_member"]}
					</Typography>

					<Typography mb={3}>{user.about}</Typography>

					<ListProfile>
						<ListItem>
							<PersonOutlineIcon fontSize="8px" />
							<Typography> {user.friendsStatistic?.friends}</Typography>
							<Circle />
						</ListItem>
						<ListItem>
							<NewspaperIcon fontSize="8px" />
							<Typography> {user?.feedStatistic?.posts}</Typography>
							<Circle />
						</ListItem>
						<ListItem>
							<StarBorderIcon fontSize="8px" />
							<Typography> {user?.feedStatistic?.events}</Typography>
							<Circle />
						</ListItem>
						<ListItem>
							<TipsAndUpdatesIcon fontSize="8px" />
							<Typography>{user?.feedStatistic?.votings}</Typography>
						</ListItem>
					</ListProfile>
				</ContainerInfoProfile>
			</ContainerHeaderProfile>
		</ContainerTopProfile>
	);
};

export default PersonalProfileHeader;
