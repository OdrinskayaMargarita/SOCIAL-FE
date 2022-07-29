import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { headerTitles, sortGroupsKeys } from "store/constants/groups.constants";
import { setSortParams, clearEntities } from "store/reducers/group.reducer";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { getMembers } from "../../../../store/thunks/group.thunks";

const StyledIcon = styled(ArrowDownwardIcon)`
	font-size: 0.75em;
	color: #748893;
	${(props) => (props.active ? "color: #3B59F5; transition: 0.3s;" : "")}
	${(props) => (props.rotate ? "transform: rotate(180deg); transition: 0.3s;" : "")}
	margin-left: 10px;
`;

export const GroupMemberListHeader = ({ setIsLoading }) => {
	const router = useRouter();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { sortingParam, sortDirection } = useSelector((state) => state.group);
	const [groupId, setGroupId] = useState(router.query.id || 0);

	const changeActiveSort = useCallback(
		async (key) => {
			try {
				dispatch(clearEntities());
				dispatch(setSortParams({ key }));
				setIsLoading(true);
				await dispatch(getMembers(groupId));
			} catch (e) {
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		},
		[dispatch],
	);
	const titles = headerTitles.filter((title) => title.key !== sortGroupsKeys.MEMBERS);

	return (
		<Grid
			container
			sx={{
				padding: "10px 20px",
			}}
		>
			{titles.map((title, index) => (
				<Grid
					item
					onClickCapture={() => changeActiveSort(title.key)}
					key={index}
					xs={title.key === sortGroupsKeys.NAME ? 10 : 2}
					sx={{
						display: "flex",
						alighItems: "center",
						justifyContent: title.key === sortGroupsKeys.NAME ? "flex-start" : "flex-end",
						cursor: "pointer",
					}}
				>
					<Typography variant="h4" color={sortingParam === title.key ? "#000" : "#748893"}>
						{t(title.name)}
					</Typography>
					<StyledIcon
						name={title.icon.name}
						rotate={sortingParam === title.key && sortDirection === "DESC"}
						active={sortingParam === title.key}
					/>
				</Grid>
			))}
		</Grid>
	);
};
