export const sortGroupsKeys = {
	NAME: "NAME",
	MEMBERS: "MEMBERS",
	FEED_TOTAL_COUNT: "FEED_TOTAL_COUNT",
};

export const membersGroupListTypes = {
	MEMBERS: "MEMBERS",
	APLICANTS: "APLICANTS",
};

export const groupTypes = {
	PRIVATE: "PRIVATE",
	PUBLIC: "PUBLIC",
};

export const groupsMembersRole = {
	OWNER: "OWNER",
	ADMINISTRATOR: "ADMINISTRATOR",
	MODERATOR: "MODERATOR",
	FOLLOWER: "FOLLOWER",
	REQUEST_SUBMITTED: "REQUEST_SUBMITTED",
	REQUEST_REJECTED: "REQUEST_REJECTED",
};

export const inviteGroupButtonText = {
	[groupsMembersRole.OWNER]: "group.leave",
	[groupsMembersRole.ADMINISTRATOR]: "group.leave",
	[groupsMembersRole.MODERATOR]: "group.leave",
	[groupsMembersRole.FOLLOWER]: "group.leave",
	[groupsMembersRole.REQUEST_SUBMITTED]: "group.member.pending",
	[groupsMembersRole.REQUEST_REJECTED]: "group.join",
};

export const headerPersonalTitles = [
	{
		key: sortGroupsKeys.NAME,
		name: "group.keys.name",
		icon: {
			size: "small",
			name: "arrow down",
		},
	},
];

export const headerTitles = [
	{
		key: sortGroupsKeys.NAME,
		name: "group.keys.name",
		icon: {
			size: "small",
			name: "arrow down",
		},
	},
	{
		key: sortGroupsKeys.MEMBERS,
		name: "group.keys.members",
		icon: {
			size: "small",
			name: "arrow down",
		},
	},
	{
		key: sortGroupsKeys.FEED_TOTAL_COUNT,
		name: "group.keys.posts",
		icon: {
			size: "small",
			name: "arrow down",
		},
	},
];

export const GROUP_VIEW_TYPES = {
	DEFAULT: "DEFAULT",
	FIRST_EDIT: "FIRST_EDIT",
	EDIT: "EDIT",
};

export const GROUPLIST_TYPES = {
	MY_GROUPS: "MY_GROUPS",
	ALL_GROUPS: "ALL_GROUPS",
	USER_GROUPS: "USER_GROUPS",
	PROFILE_GROUPS: "PROFILE_GROUPS",
};

export const DEFAULT_SUBJECT_ID = 1;
export const DEFAULT_CATEGORY_ID = 1;
export const DEFAULT_CATEGORY_ITEM_ID = 1;
export const DEFAULT_SELECT_GROUP_LIMIT = 1000;

export const GROUP_IMAGES_TYPES = {
	AVATAR: "AVATAR",
	BACKGROUND: "BACKGROUND",
};

export const ACCEPTABLE_ERROR_CODES = {
	GROUP_NAME_ALREADY_USED: "GROUP_NAME_ALREADY_USED",
};

export const createModalUserValue = {
	id: "USER_PROFILE",
	key: "feed.createPost.feed",
	is_followed: true,
};
