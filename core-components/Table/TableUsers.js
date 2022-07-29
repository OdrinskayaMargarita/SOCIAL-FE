import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import { getUsers } from "store/thunks/users.thunks";
import { sortUsersKeys } from "store/constants/users.constants";
import { clearEntities, reset, setSortParams } from "store/reducers/users.reducer";

import { InfiniteTable } from "./Table";
import Avatar from "../Avatar";

const NameCell = ({ row: { firstname, lastname, avatar, isMember }, isLoadingState }) => {
	return (
		<Stack spacing={2} direction="row" alignItems="center">
			{isLoadingState ? (
				<Skeleton variant="circular">
					<Avatar />
				</Skeleton>
			) : (
				<Avatar src={avatar?.url} firstName={firstname} isMember={isMember} lastName={lastname} />
			)}
			<Typography fontWeight="fontWeightMedium">
				{isLoadingState ? <Skeleton variant="text" width={100} /> : `${firstname} ${lastname}`}
			</Typography>
		</Stack>
	);
};

const TableUsers = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { translation } = useSelector((state) => state.app);
	const { user: currentUser } = useSelector((state) => state.auth);
	const { hasMore, entities } = useSelector((state) => state.users);
	const [isLoading, setIsLoading] = useState(false);

	const loadUsers = useCallback(async () => {
		setIsLoading(true);
		await dispatch(getUsers());
		setIsLoading(false);
	}, [dispatch]);

	const changeActiveSort = useCallback(
		(key) => {
			dispatch(clearEntities());
			dispatch(setSortParams({ key }));
			loadUsers();
		},
		[dispatch],
	);

	useEffect(() => {
		loadUsers();
		return () => dispatch(reset());
	}, [dispatch]);

	return (
		<InfiniteTable
			columns={[
				{
					id: sortUsersKeys.FIRSTNAME,
					name: translation["otherUserProfile.tabs.friends.nameSort"],
					sortable: true,
					Component: NameCell,
				},
				{
					id: sortUsersKeys.FRIENDS_COUNT,
					name: translation["otherUserProfile.tabs.friends"],
					sortable: true,
					align: "right",
					Component: ({ row: { friendsStatistic }, isLoadingState }) => (
						<Typography>
							{isLoadingState ? (
								<Skeleton variant="text" width={15} sx={{ display: "inline-block" }} />
							) : (
								friendsStatistic?.friendsCount
							)}
						</Typography>
					),
				},
				{
					id: sortUsersKeys.FEED_TOTAL_COUNT,
					name: translation["otherUserProfile.tabs.groups.postsSort"],
					sortable: true,
					align: "right",
					Component: ({ row: { feedStatistic }, isLoadingState }) => (
						<Typography>
							{isLoadingState ? (
								<Skeleton variant="text" width={15} sx={{ display: "inline-block" }} />
							) : (
								feedStatistic?.total
							)}
						</Typography>
					),
				},
			]}
			data={entities}
			isLoading={isLoading}
			onRowClick={({ id }) =>
				router.push(currentUser.id === id ? "/profile" : `/social/users/${id}`)
			}
			onSort={changeActiveSort}
			infinityScrollProps={{
				dataLength: entities.length,
				hasMore,
				next: loadUsers,
				isLoading,
			}}
		/>
	);
};

export default TableUsers;
