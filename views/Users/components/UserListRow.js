import React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import Avatar from "../../../core-components/Avatar";

const ListItem = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	border-bottom: 1px solid rgba(109, 144, 155, 0.2);
	padding: 12px 20px;
	cursor: pointer;
	&:hover {
		background-color: rgba(109, 144, 155, 0.1);
	}
`;

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		"&.MuiBadge-standard": {
			width: "20px",
			height: "20px",
			padding: "0",
		},
	},
}));

const ItemBox = styled(Box)`
	display: flex;
	align-items: center;
	&:nth-of-type(1n) {
		width: 60%;
		justify-content: flex-start;
	}

	&:nth-of-type(2n) {
		width: 20%;
		justify-content: flex-end;
	}

	&:nth-of-type(3n) {
		width: 20%;
		justify-content: flex-end;
	}
`;

const UsersListRow = ({
	isOnline,
	firstname,
	lastname,
	avatar,
	isMember,
	friendsStatistic,
	feedStatistic,
	id,
}) => {
	const router = useRouter();
	const { user } = useSelector((state) => state.auth);

	const onRowClicked = () => {
		if (user.id === id) {
			router.push("/profile");
		} else {
			router.push(`/social/users/${id}`);
		}
	};

	return (
		<ListItem onClick={() => onRowClicked()}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-start",
					alignItems: "center",
					width: "60%",
					gap: "10px",
				}}
			>
				<div>
					<Avatar src={avatar?.url} firstName={firstname} lastName={lastname} isMember={isMember} />
				</div>
				<Typography>
					{firstname} {lastname}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
					width: "20%",
				}}
			>
				<Typography>{friendsStatistic?.friendsCount}</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
					width: "20%",
				}}
			>
				<Typography>{feedStatistic?.total}</Typography>
			</Box>
		</ListItem>
	);
};

export default UsersListRow;
