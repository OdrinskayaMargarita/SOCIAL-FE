import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Typography from "@mui/material/Typography";

import { profileHeaderTitles } from "store/constants/profile.constants";
import { headerTitles as userFriendsHeaderTitles } from "store/constants/users.constants";
import { setSortParams, clearEntities, setOnline } from "store/reducers/friends.reducer";
import { fetchFriends, fetchFriendsInvitations } from "store/thunks/friends.thunks";
import Grid from "@mui/material/Grid";

export const FriendsListHeader = ({ setIsLoading, id, isProfilelist, userCurrent }) => {
	const dispatch = useDispatch();
	const { sortingParam, sortDirection } = useSelector((state) => state.friends);
	const [sortState, setSortState] = useState(true);
	const { translation } = useSelector((state) => state.app);
	const [onlineOnly, setOnlineOnly] = useState(false);

	const toggleHandler = async (event, data) => {
		try {
			dispatch(clearEntities());
			setIsLoading(true);
			setOnlineOnly(data);
			await dispatch(fetchFriendsInvitations(id));
			dispatch(setOnline(data));
			await dispatch(fetchFriends(id));
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	const changeActiveSort = async (key) => {
		setSortState(!sortState);
		try {
			dispatch(clearEntities());
			await dispatch(fetchFriendsInvitations(id));
			dispatch(setSortParams({ key }));
			setIsLoading(true);
			await dispatch(fetchFriends(id));
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	const titlesRenderer = useMemo(() => {
		return (!isProfilelist ? profileHeaderTitles : userFriendsHeaderTitles).map(
			(titleItem, index) => (
				<Grid
					container
					alignItems="center"
					justifyContent="flex-start"
					onClickCapture={() => changeActiveSort(titleItem.key)}
					key={index}
					sx={{ cursor: "pointer" }}
				>
					<Typography>{translation?.["myProfile.tabs.friends.nameSort"]}</Typography>
					{sortState ? (
						<ArrowDownwardIcon fontSize="small" color="blue" />
					) : (
						<ArrowUpwardIcon fontSize="small" color="blue" />
					)}
				</Grid>
			),
		);
	}, [isProfilelist, sortingParam, sortDirection]);

	return (
		<>
			<Grid
				container
				alignItems="center"
				justifyContent="space-between"
				sx={{ borderBottom: "1px solid rgba(109, 144, 155, 0.2)" }}
				px={3}
			>
				<Grid item xs={6}>
					{titlesRenderer}
				</Grid>
				{!isProfilelist && !userCurrent?.friendStatus && (
					<Grid xs={6} item container alignItems="center" justifyContent="flex-end">
						<FormControlLabel
							labelPlacement="start"
							label={translation?.["myProfile.tabs.friends.toggleFriendsOnline"]}
							control={
								<Switch
									variant="greenProfile"
									checked={onlineOnly}
									onChange={toggleHandler}
									name="checkedB"
									color="primary"
								/>
							}
						/>
					</Grid>
				)}
			</Grid>
		</>
	);
};
