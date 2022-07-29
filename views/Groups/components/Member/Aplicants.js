import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Scroller } from "components/common";
import { reset } from "store/reducers/users.reducer";
import { useRouter } from "next/router";
import { Box } from "@material-ui/core";
import { DEFAULT_GROUPS_TABLE_LIMIT } from "store/constants/pagination.constants";
import EmptyFeeds from "core-components/EmptyFeeds/EmptyFeeds";
import GroupListAplicantRow from "./GroupListAplicantRow";
import GroupAplicantsListHeader from "./GroupAplicantsListHeader";

import { getApplicants } from "../../../../store/thunks/group.thunks";

const Aplicants = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const dispatch = useDispatch();
	const { hasMore, entities } = useSelector((state) => state.group.applicants);
	const [groupId, setGroupId] = useState(router.query.id || 0);
	const [isLoading, setIsLoading] = useState(false);
	const loadUsers = useCallback(() => {
		dispatch(
			getApplicants({
				groupId,
				isRequestApplicants: true,
			}),
		);
	}, [dispatch]);

	useEffect(() => {
		dispatch(getApplicants(groupId));
		return () => dispatch(reset());
	}, [dispatch]);

	return (
		<>
			<GroupAplicantsListHeader setIsLoading={setIsLoading} />
			<Box>
				{entities && entities.length ? (
					<Scroller
						items={entities}
						hasMore={hasMore}
						next={loadUsers}
						component={GroupListAplicantRow}
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

export default Aplicants;
