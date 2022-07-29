import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Scroller } from "components/common";
import { reset } from "store/reducers/users.reducer";
import { useRouter } from "next/router";
import { Box } from "@material-ui/core";
import { DEFAULT_GROUPS_TABLE_LIMIT } from "store/constants/pagination.constants";
import { getMembers } from "store/thunks/group.thunks";
import EmptyFeeds from "core-components/EmptyFeeds/EmptyFeeds";
import GroupListMemberRow from "./GroupListMemberRow";
import { GroupMemberListHeader } from "./GroupMemberListHeader";

const Members = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const dispatch = useDispatch();
	const { hasMore, entities } = useSelector((state) => state.group);
	const [groupId, setGroupId] = useState(router.query.id || 0);
	const [isLoading, setIsLoading] = useState(false);
	const loadUsers = useCallback(() => {
		dispatch(getMembers(groupId));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getMembers(groupId));
		return () => dispatch(reset());
	}, [dispatch]);

	return (
		<>
			<GroupMemberListHeader setIsLoading={setIsLoading} />
			<Box>
				{entities && entities ? (
					<Scroller
						items={entities}
						hasMore={hasMore}
						next={loadUsers}
						component={GroupListMemberRow}
						target="users-scroller"
						isLoading={isLoading}
						style={{
							overflowX: "hidden",
						}}
					/>
				) : (
					<EmptyFeeds />
				)}
			</Box>
		</>
	);
};

export default Members;
