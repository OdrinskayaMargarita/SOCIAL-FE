import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { GROUPLIST_TYPES, sortGroupsKeys } from "store/constants/groups.constants";
import { setSortParams, clearEntities, setOnlyAdmin } from "store/reducers/group.reducer";
import { getGroups } from "store/thunks/group.thunks";
import { Switch } from "@mui/material";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";

const StyledIcon = styled(ArrowUpwardIcon)`
	font-size: 0.75em;
	color: #748893;
	margin-left: 5px;
	${(props) => (props.active ? "color: #3B59F5; transition: 0.3s;" : "")}
	${(props) => (props.rotate ? "transform: rotate(180deg); transition: 0.3s;" : "")}
`;

export const GroupListHeader = ({ setIsLoading, groupListType, userId, user }) => {
	const dispatch = useDispatch();
	const { translation } = useSelector((state) => state.app);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const { sortingParam, sortDirection, onlyAdmin } = useSelector((state) => state.group);

	const headerPersonalTitles = useMemo(
		() => [
			{
				key: sortGroupsKeys.NAME,
				name: translation?.["groups.all.name"],
				icon: {
					size: "small",
					name: "arrow down",
				},
			},
		],
		[translation],
	);

	const headerTitles = useMemo(
		() => [
			{
				key: sortGroupsKeys.NAME,
				name: translation?.["groups.all.name"],
				size: 6,
				icon: {
					size: "small",
					name: "arrow down",
				},
			},
			{
				key: sortGroupsKeys.MEMBERS,
				name: translation?.["groups.all.members"],
				size: null,
				icon: {
					size: "small",
					name: "arrow down",
				},
			},
			{
				key: sortGroupsKeys.FEED_TOTAL_COUNT,
				name: translation?.["groups.all.posts"],
				size: null,
				icon: {
					size: "small",
					name: "arrow down",
				},
			},
		],
		[translation],
	);

	const changeActiveSort = useCallback(
		async (key) => {
			try {
				dispatch(clearEntities());
				dispatch(setSortParams({ key }));
				setIsLoading(true);
				await dispatch(getGroups({ userId }));
			} catch (e) {
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		},
		[dispatch, userId],
	);

	const changeAdminMode = useCallback(
		async (checked) => {
			try {
				dispatch(clearEntities());
				dispatch(setOnlyAdmin(checked));
				setIsLoading(true);
				await dispatch(getGroups({ userId }));
			} catch (e) {
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		},
		[dispatch],
	);

	const titlesRenderer = useMemo(() => {
		return (
			<Grid container justifyContent="space-between" alignItems="center">
				{(groupListType === GROUPLIST_TYPES.PROFILE_GROUPS
					? headerPersonalTitles
					: headerTitles
				).map((title, index) => (
					<Grid item xs={title.size} key={index} sx={{ justifyContent: "flex-start" }} spacing={1}>
						<Grid
							container
							alignItems="center"
							onClick={() => changeActiveSort(title.key)}
							sx={{ justifyContent: title.size ? "flex-start" : "flex-end", cursor: "pointer" }}
						>
							<Typography color={sortingParam === title.key ? "#000" : "#748893"} variant="h4">
								{title.name}
							</Typography>
							<StyledIcon
								name={title.icon.name}
								rotate={sortingParam === title.key && sortDirection === "DESC"}
								active={sortingParam === title.key}
							/>
						</Grid>
					</Grid>
				))}
				<Grid item width="100px" />
			</Grid>
		);
	}, [groupListType, sortingParam, sortDirection, translation]);

	const isButtonDisplayed = useMemo(
		() =>
			groupListType === GROUPLIST_TYPES.MY_GROUPS || groupListType === GROUPLIST_TYPES.ALL_GROUPS,
		[groupListType],
	);

	return (
		<Grid
			container
			alignItems="center"
			justifyContent="space-between"
			px={3}
			sx={{ borderBottom: "1px solid rgba(109, 144, 155, 0.2)" }}
		>
			<Grid item xs={6}>
				{titlesRenderer}
			</Grid>
			{!isButtonDisplayed && !user?.friendStatus && (
				<Grid xs={6} item container alignItems="center" justifyContent="flex-end">
					<FormControlLabel
						labelPlacement="start"
						label={translation?.["myProfile.tabs.groups.toggleAdminByMe"]}
						control={
							<Switch
								variant="greenProfile"
								onChange={(_, checked) => changeAdminMode(checked)}
								checked={Boolean(onlyAdmin)}
							/>
						}
					/>
				</Grid>
			)}
		</Grid>
	);
};
