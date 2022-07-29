import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Scroller } from "components/common";
import UsersListRow from "views/Users/components/UserListRow";
import { clearEntities } from "store/reducers/friends.reducer";
import { fetchFriends, fetchFriendsInvitations } from "store/thunks/friends.thunks";
import EmptyFeeds from "core-components/EmptyFeeds/EmptyFeeds";
import { FriendsListHeader } from "./FriendsListHeader";
import ProfileFriendsListRow from "./FriendsListRow";
import { FRIENDSLIST_TYPES } from "../../store/constants/users.constants";

export const FriendsList = ({ id, title, friendsListType, userCurrent }) => {
	const dispatch = useDispatch();
	const friendsEntities = useSelector((state) => state.friends);
	const user = useSelector((state) => state.auth.user);
	const [isLoading, setIsLoading] = useState(false);

	const { hasMore, entities, entitiesInvations } = friendsEntities;

	const loadFriends = () => {
		dispatch(fetchFriends(id));
		dispatch(fetchFriendsInvitations(id));
	};

	useEffect(() => {
		dispatch(clearEntities());
		dispatch(fetchFriends(id));
		dispatch(fetchFriendsInvitations(id));
	}, [dispatch, id]);

	const isProfileList = useMemo(() => user?.id === id, [user, id]);

	return (
		<div>
			{friendsListType !== FRIENDSLIST_TYPES.REQUEST_TO_FRIENDS && (
				<FriendsListHeader
					{...{ setIsLoading, id, user }}
					isProfileList={isProfileList}
					title={title}
					userCurrent={userCurrent}
				/>
			)}

			<div>
				{(entities || entitiesInvations) && (entities.length || entitiesInvations.length) ? (
					<Scroller
						items={friendsListType === FRIENDSLIST_TYPES.ALL_FRIENDS ? entities : entitiesInvations}
						hasMore={hasMore}
						next={loadFriends}
						component={isProfileList ? ProfileFriendsListRow : UsersListRow}
						isLoading={isLoading}
					/>
				) : (
					<EmptyFeeds />
				)}
			</div>
		</div>
	);
};
