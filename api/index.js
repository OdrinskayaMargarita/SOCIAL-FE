// Authentication API
import {
	checkEmail,
	confirmSecureCode,
	continueForgotPassword,
	fetchProfile,
	finishForgotPassword,
	initForgotPassword,
	loginUser,
	loginSocialUser,
	registerSocialAccount,
	registerUserAccount,
	sendSecureCode,
} from "./auth.api";
// Feed API
import { fetchFeeds, fetchFeedsByUser, setLikeApi, createPostApi } from "./feed.api";
// Group API
import {
	fetchFeedsData,
	fetchGroupData,
	fetchGroups,
	fetchTopGroups,
	followGroup,
	unfollowGroup,
	createGroupData,
	getCountriesData,
	updateGroupData,
} from "./group.api";
// Profile API
import { updateProfile, becomeMember, confirmMember } from "./profile.api";
// Messenger API
import { fetchChatsList, createChat, fetchChat, sendMessageToChat } from "./messenger.api";
// Friends API
import { fetchFriendsList } from "./friends.api";
import { createSingleComment } from "./comments.api";
import { fetchComments } from "./comments";

export {
	checkEmail,
	confirmSecureCode,
	continueForgotPassword,
	fetchFeeds,
	fetchFeedsByUser,
	fetchFeedsData,
	fetchGroupData,
	fetchGroups,
	fetchProfile,
	fetchTopGroups,
	finishForgotPassword,
	initForgotPassword,
	loginUser,
	loginSocialUser,
	registerSocialAccount,
	registerUserAccount,
	sendSecureCode,
	updateProfile,
	fetchChatsList,
	fetchChat,
	createChat,
	sendMessageToChat,
	fetchFriendsList,
	becomeMember,
	confirmMember,
	followGroup,
	unfollowGroup,
	createGroupData,
	getCountriesData,
	createSingleComment,
	setLikeApi,
	updateGroupData,
	createPostApi,
	fetchComments,
};
