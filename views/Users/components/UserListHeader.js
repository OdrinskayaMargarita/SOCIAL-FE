import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";

import { sortUsersKeys } from "store/constants/users.constants";
import { getUsers } from "store/thunks/users.thunks";
import { setSortParams, clearEntities } from "store/reducers/users.reducer";
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ListHeader = styled.div`
	display: flex;
	height: 40px;
	width: 100%;
	align-items: center;
	border-bottom: 1px solid rgba(109, 144, 155, 0.2);
	border-top: 1px solid rgba(109, 144, 155, 0.2);
	padding: 0 20px;
`;

const ItemText = styled(Typography)`
	font-weight: 500;
	font-size: 12px;
	line-height: 16px;
	cursor: pointer;
`;

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

export const UserListHeader = ({ setIsLoading }) => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const { sortingParam, sortDirection } = useSelector((state) => state.users);

	const changeActiveSort = useCallback(
		async (key) => {
			try {
				dispatch(clearEntities());
				dispatch(setSortParams({ key }));
				setIsLoading(true);
				await dispatch(getUsers());
			} catch (e) {
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		},
		[dispatch],
	);

	const StyledIcon = styled(ArrowUpwardIcon)`
		font-size: 0.75em;
		color: #748893;
		${(props) => (props.active ? "color: #3B59F5; transition: 0.3s;" : "")}
		${(props) => (props.rotate ? "transform: rotate(180deg); transition: 0.3s;" : "")}
	`;

	const headerTitles = [
		{
			key: sortUsersKeys.FIRSTNAME,
			name: translation?.["otherUserProfile.tabs.friends.nameSort"],
			icon: {
				size: "small",
				name: "arrow down",
			},
		},
		{
			key: sortUsersKeys.FRIENDS_COUNT,
			name: translation?.["otherUserProfile.tabs.friends"],
			icon: {
				size: "small",
				name: "arrow down",
			},
		},
		{
			key: sortUsersKeys.FEED_TOTAL_COUNT,
			name: translation?.["otherUserProfile.tabs.groups.postsSort"],
			icon: {
				size: "small",
				name: "arrow down",
			},
		},
	];

	return (
		<ListHeader>
			{headerTitles.map((title, index) => (
				<ItemBox onClick={() => changeActiveSort(title.key)} key={index}>
					<ItemText color={sortingParam === title.key ? "#000" : "#748893"}>{title.name}</ItemText>
					<StyledIcon
						name={title.icon.name}
						rotate={sortingParam === title.key && sortDirection === "DESC"}
						active={sortingParam === title.key}
					/>
				</ItemBox>
			))}
		</ListHeader>
	);
};
