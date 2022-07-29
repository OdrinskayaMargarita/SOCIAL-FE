import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";

import Scroller from "components/common/Scroller";
import { getGroups } from "store/thunks/group.thunks";
import { clearEntities } from "store/reducers/group.reducer";

import { GROUPLIST_TYPES, groupsMembersRole } from "store/constants/groups.constants";
import EmptyFeeds from "core-components/EmptyFeeds/EmptyFeeds";
import AllGroupsListRow from "./AllGroupsListRow";
import { GroupListHeader } from "./GroupListHeader";
import ProfileGroupsRow from "./ProfileGroupsRow";
import UserGroupsRow from "./UserGroupsRow";
import { SectionHeader } from "../../../components/Sections/SectionItem";

const GroupsList = ({ groupListType, user, userId = null, title }) => {
	const dispatch = useDispatch();
	const { hasMore, entities } = useSelector((state) => state.group);
	const [isLoading, setIsLoading] = useState(false);

	const loadGroups = () => {
		dispatch(getGroups({ userId, groupListType }));
	};

	const getGroupRowComponent = useMemo(() => {
		switch (groupListType) {
			case GROUPLIST_TYPES.PROFILE_GROUPS:
				return ProfileGroupsRow;
			case GROUPLIST_TYPES.USER_GROUPS:
				return UserGroupsRow;
			default:
				return AllGroupsListRow;
		}
	}, [groupListType, entities]);

	useEffect(() => {
		dispatch(getGroups({ userId }));
		return () => dispatch(clearEntities());
	}, [dispatch, groupListType]);

	const groupList = entities.filter(
		(group) =>
			group.currentUserRole !== groupsMembersRole.REQUEST_REJECTED &&
			group.currentUserRole !== groupsMembersRole.REQUEST_SUBMITTED,
	);
	return (
		<>
			{title && (
				<Box p={3} borderBottom="1px solid rgba(109, 144, 155, 0.2)">
					<SectionHeader.Title>{title}</SectionHeader.Title>
				</Box>
			)}
			<GroupListHeader {...{ setIsLoading, groupListType, userId, user }} />
			<div>
				{groupList && groupList.length && (
					<Scroller
						items={groupList}
						hasMore={hasMore}
						next={loadGroups}
						component={getGroupRowComponent}
						isLoading={isLoading}
						userId={userId}
					/>
				)}
				{!isLoading && groupList?.length === 0 && <EmptyFeeds />}
			</div>
		</>
	);
};

export default GroupsList;
