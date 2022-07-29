import React, { useEffect, useCallback } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatIcon from "@mui/icons-material/Chat";

import { fetchFriends } from "store/thunks/friends.thunks";
import { clearEntities } from "../../../store/reducers/friends.reducer";

const FriendItem = ({ data }) => (
	<div>
		<div
		// className={classnames(style["friend-avatar"], { [style["friend-online"]]: data.isOnline })}
		>
			<Avatar src={data?.avatar} />
		</div>
		<div>{data.firstname}</div>
		<div>
			<ChatIcon color="grey" size="large" />
		</div>
	</div>
);

const FriendsList = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { entities: friends } = useSelector((state) => state.friends);

	const fetchFriendsList = useCallback(() => {
		dispatch(clearEntities());
		dispatch(fetchFriends());
	}, [dispatch]);

	useEffect(fetchFriendsList, []);

	return (
		<div>
			<Typography variant="h4">{t("profile.friends.myFriends")}</Typography>
			{friends && friends.length ? (
				<div>
					{friends.map((friend) => (
						<FriendItem key={friend.id} data={friend} />
					))}
				</div>
			) : (
				<div>{t("profile.friends.noFriends")}</div>
			)}
		</div>
	);
};

export default FriendsList;
