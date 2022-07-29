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
	color: #3b59f5;
	${(props) => (props.rotate ? "transform: rotate(180deg); transition: 0.3s;" : "")}
	margin-left: 10px;
`;

const GroupAplicantsListHeader = ({ setIsLoading }) => {
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
	const nameTitle = headerTitles.find((el) => el.key === sortGroupsKeys.NAME);
	return (
		<Grid
			container
			sx={{
				padding: "10px 20px",
			}}
		>
			<Grid
				item
				onClickCapture={() => changeActiveSort(nameTitle.key)}
				xs={7}
				sx={{
					display: "flex",
					alighItems: "center",
					justifyContent: "flex-start",
					cursor: "pointer",
				}}
			>
				<Typography variant="h4" color="#000">
					{t(nameTitle.name)}
				</Typography>
				<StyledIcon
					name={nameTitle.icon.name}
					rotate={sortingParam === nameTitle.key && sortDirection === "DESC"}
				/>
			</Grid>
			<Grid item xs={5} />
		</Grid>
	);
};

export default GroupAplicantsListHeader;
