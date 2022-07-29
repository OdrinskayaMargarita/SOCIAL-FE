import { API_URL } from "env";
import { flow, has } from "lodash/fp";
import get from "lodash/fp/get";
import omit from "lodash/fp/omit";
import { normalizeUserData } from "./users.utils";

export const normalizeGroupData = (group) => {
	const concatApiToString = (string) => `${API_URL}${string}`;
	const categoryItem = get("category_item", group);
	const members = get("members_count", group);
	const feedStatistic = {
		articles: get(["feed_statistic", "articles_count"], group),
		events: get(["feed_statistic", "events_count"], group),
		posts: get(["feed_statistic", "posts_count"], group),
		votings: get(["feed_statistic", "voting_count"], group),
		total: get(["feed_statistic", "total_count"], group),
	};
	const isFollowed = get("is_followed", group);
	const isSystem = get("is_system", group);
	const avatar = {
		url: has(["avatar", "url"], group) ? concatApiToString(get(["avatar", "url"], group)) : null,
		filename: has(["avatar", "filename"], group) ? get(["avatar", "filename"], group) : null,
	};
	const background = {
		url: has(["background", "url"], group)
			? concatApiToString(get(["background", "url"], group))
			: null,
		filename: has(["avatar", "filename"], group) ? get(["avatar", "filename"], group) : null,
	};
	const currentUserRole = get("current_user_role", group);
	const awaitingMembersCount = get("awaiting_members_count", group);

	return {
		categoryItem,
		members,
		feedStatistic,
		isFollowed,
		isSystem,
		avatar,
		background,
		currentUserRole,
		awaitingMembersCount,
		...omit(
			[
				"category_item",
				"members_count",
				"feed_statistic",
				"is_followed",
				"is_system",
				"background",
				"avatar",
				"current_user_role",
				"awaiting_members_count",
			],
			group,
		),
	};
};

export const normalizeGroupsData = (data) => data.map((group) => normalizeGroupData(group));

export const normalizeGroupCountry = (country) => ({
	translationKey: get("translation_key", country),
	value: get("id", country),
	text: get("name", country),
});

export const normalizeGroupCountries = (data) =>
	data.map((country) => normalizeGroupCountry(country));

export const normalizeGroupMembersData = (data) =>
	data.map((user) => {
		return normalizeGroupData(user.user);
	});
