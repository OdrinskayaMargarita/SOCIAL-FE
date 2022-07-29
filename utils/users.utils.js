import { API_URL } from "env";
import { flow, has } from "lodash/fp";
import get from "lodash/fp/get";
import omit from "lodash/fp/omit";

export const normalizeUserData = (user) => {
	const concatApiToString = (string) => `${API_URL}${string}`;

	const feedStatistic = {
		articles: get(["feed_statistic", "articles_count"], user),
		events: get(["feed_statistic", "events_count"], user),
		posts: get(["feed_statistic", "posts_count"], user),
		votings: get(["feed_statistic", "voting_count"], user),
		total: get(["feed_statistic", "total_count"], user),
	};
	const isOnline = get("is_online", user);
	const isMember = get("is_member", user);
	const phoneNumber = get("phone_number", user);
	const friendStatus = get("friend_status", user);
	const friendsStatistic = {
		friendsCount: get(["friends_statistic", "friends_count"], user),
		unacceptedFriendsCount: get(["friends_statistic", "unaccepted_friends_count"], user),
	};
	const isFollowed = get("followed", user);
	const avatar = {
		url: has(["avatar", "url"], user) ? concatApiToString(get(["avatar", "url"], user)) : null,
		filename: has(["avatar", "filename"], user) ? get(["avatar", "filename"], user) : null,
	};
	const background = {
		url: has(["background", "url"], user)
			? concatApiToString(get(["background", "url"], user))
			: null,
		filename: has(["avatar", "filename"], user) ? get(["avatar", "filename"], user) : null,
	};
	return {
		...omit(
			[
				"is_online",
				"is_member",
				"phone_number",
				"members_count",
				"feed_statistic",
				"followed",
				"background",
				"avatar",
				"friend_status",
				"friends_statistic",
			],
			user,
		),
		isFollowed,
		isOnline,
		isMember,
		phoneNumber,
		avatar,
		background,
		friendStatus,
		friendsStatistic,
		feedStatistic,
	};
};

export const normalizeUsersData = (data) => data.map((user) => normalizeUserData(user));

export const calculateSortDirection = (sortDirection, sortingParam, key) => {
	if (sortingParam !== key) {
		return { sortingParam: key, sortDirection: "ASC" };
	}
	return { sortingParam, sortDirection: sortDirection === "ASC" ? "DESC" : "ASC" };
};
