export const sortUsersKeys = {
	FIRSTNAME: "FIRSTNAME",
	FRIENDS_COUNT: "FRIENDS_COUNT",
	FEED_TOTAL_COUNT: "FEED_TOTAL_COUNT",
};

export const FRIEND_STATUS = {
	NOT_FRIENDS: "NOT_FRIENDS",
	ACCEPTED: "ACCEPTED",
	WAITING_ACCEPT: "WAITING_ACCEPT",
	REQUESTER_DECLINED: "REQUESTER_DECLINED",
	RECIPIENT_DECLINED: "RECIPIENT_DECLINED",
};

export const FRIENDSLIST_TYPES = {
	ALL_FRIENDS: "ALL_FRIENDS",
	REQUEST_TO_FRIENDS: "REQUEST_TO_FRIENDS",
	WAITING_ACCEPT: "WAITING_ACCEPT",
};

export const headerTitles = [
	{
		key: sortUsersKeys.FIRSTNAME,
		name: "users.feed.name",
		size: 6,
		icon: {
			size: "small",
			name: "arrow down",
		},
	},
	{
		key: sortUsersKeys.FRIENDS_COUNT,
		name: "users.feed.friends",
		size: 1,
		icon: {
			size: "small",
			name: "arrow down",
		},
	},
	{
		key: sortUsersKeys.FEED_TOTAL_COUNT,
		name: "users.feed.posts",
		size: 1,
		icon: {
			size: "small",
			name: "arrow down",
		},
	},
];

export const userTabs = [
	{
		menuItem: "users.tabs.feed",
		key: "FEED",
	},
	{
		menuItem: "users.tabs.groups",
		key: "GROUPS",
	},
	{
		menuItem: "users.tabs.friends",
		key: "FRIENDS",
	},
	{
		menuItem: "users.tabs.articles",
		key: "ARTICLES",
	},
	{
		menuItem: "users.tabs.events",
		key: "EVENTS",
	},
	{
		menuItem: "users.tabs.solutions",
		key: "SOLUTIONS",
	},
	{
		menuItem: "users.tabs.contacts",
		key: "CONTACTS",
	},
];
