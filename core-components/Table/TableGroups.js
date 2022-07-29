import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";

import { getGroups, joinGroup, leaveGroup } from "store/thunks/group.thunks";
import {
	groupsMembersRole,
	groupTypes,
	inviteGroupButtonText,
	sortGroupsKeys,
} from "store/constants/groups.constants";
import {
	changeGroupListData,
	clearEntities,
	reset,
	setSortParams,
} from "store/reducers/group.reducer";

import { InfiniteTable } from "./Table";
import Avatar from "../Avatar";

const NameCell = ({ row: { name, city, country, avatar }, isLoadingState }) => {
	return (
		<Stack spacing={2} direction="row" alignItems="center">
			{isLoadingState ? (
				<Skeleton variant="circular">
					<Avatar firstName={name} />
				</Skeleton>
			) : (
				<Avatar src={avatar?.url} firstName={name} />
			)}
			<Stack>
				<Typography fontWeight="fontWeightMedium">
					{isLoadingState ? <Skeleton variant="text" width={100} /> : `${name}`}
				</Typography>
				<Typography>
					{isLoadingState ? <Skeleton variant="text" width={150} /> : `${city} ${country?.name}`}
				</Typography>
			</Stack>
		</Stack>
	);
};

const ButtonCell = ({ row: { id, currentUserRole, isSystem, isFollowed }, isLoadingState }) => {
	const { translation } = useSelector((state) => state.app);
	const { isLoggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleFollowStatus = useCallback(
		async (event) => {
			event.stopPropagation();
			try {
				const action = isFollowed ? leaveGroup : joinGroup;
				const {
					payload: { success, data },
				} = await dispatch(action(id));
				if (success) {
					const newRole = groupsMembersRole?.[data];

					if (newRole) {
						dispatch(changeGroupListData({ key: "currentUserRole", value: newRole, id }));
					}
					dispatch(changeGroupListData({ key: "isFollowed", value: !isFollowed, id }));
				}
			} catch (e) {
				console.error(e);
			}
		},
		[dispatch, isFollowed, id],
	);

	const isFollowDisabled = groupsMembersRole.OWNER === currentUserRole;

	if (!isLoggedIn || isSystem) {
		return null;
	}

	if (isLoadingState) {
		return <Skeleton variant="text" width={163} height={36} sx={{ display: "inline-block" }} />;
	}

	return (
		<>
			{currentUserRole !== "OWNER" && (
				<Button
					variant={currentUserRole ? "lightGrey" : "lightBlue"}
					onClick={handleFollowStatus}
					disabled={isFollowDisabled}
				>
					{isFollowed
						? translation[inviteGroupButtonText[currentUserRole]]
						: translation["group.join"]}
				</Button>
			)}
		</>
	);
};

const TableGroups = ({ userId, groupListType }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { translation } = useSelector((state) => state.app);
	const { hasMore, entities } = useSelector((state) => state.group);
	const [isLoading, setIsLoading] = useState(false);

	const loadGroups = useCallback(async () => {
		setIsLoading(true);
		await dispatch(getGroups({ userId, groupListType }));
		setIsLoading(false);
	}, [dispatch, userId, groupListType]);

	const changeActiveSort = useCallback(
		(key) => {
			dispatch(clearEntities());
			dispatch(setSortParams({ key }));
			loadGroups();
		},
		[dispatch],
	);

	useEffect(() => {
		loadGroups();
		return () => dispatch(clearEntities());
	}, [dispatch, userId, groupListType]);

	useEffect(() => {
		return () => dispatch(reset());
	}, [dispatch]);

	return (
		<InfiniteTable
			columns={[
				{
					id: sortGroupsKeys.NAME,
					name: translation["groups.all.name"],
					sortable: true,
					sx: { width: ["auto", "40%"] },
					Component: NameCell,
				},
				{
					id: sortGroupsKeys.MEMBERS,
					name: translation["groups.all.members"],
					sortable: true,
					align: "right",
					sx: { display: ["none", "table-cell"] },
					Component: ({ row: { members }, isLoadingState }) => (
						<Typography>
							{isLoadingState ? (
								<Skeleton variant="text" width={15} sx={{ display: "inline-block" }} />
							) : (
								members
							)}
						</Typography>
					),
				},
				{
					id: sortGroupsKeys.FEED_TOTAL_COUNT,
					sortable: true,
					name: translation["groups.all.posts"],
					align: "right",
					sx: { display: ["none", "table-cell"] },
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
				{
					id: "actions",
					name: "",
					align: "right",
					Component: ButtonCell,
				},
			]}
			data={entities}
			isLoading={isLoading}
			onRowClick={({ id }) => router.push(`/social/groups/${id}`)}
			onSort={changeActiveSort}
			infinityScrollProps={{
				dataLength: entities.length,
				hasMore,
				next: loadGroups,
				isLoading,
			}}
		/>
	);
};

export default TableGroups;
