export const DATA_PRIVACY_TYPES = {
	HIDDEN: "HIDDEN",
	PUBLIC: "PUBLIC",
	ONLY_FOR_FRIENDS: "ONLY_FOR_FRIENDS",
};

export const PAYMENT_STATUSES = {
	WAITING: "WAITING_PAYMENT",
	SUCCESS: "SUCCESS",
};

export const sortFriendsKeys = {
	FIRSTNAME: "FIRSTNAME",
	FRIENDS_COUNT: "FRIENDS_COUNT",
	FEED_TOTAL_COUNT: "FEED_TOTAL_COUNT",
};

export const profileHeaderTitles = [
	{
		key: sortFriendsKeys.FIRSTNAME,
		name: "users.feed.name",
		icon: {
			size: "small",
			name: "arrow down",
		},
	},
];
