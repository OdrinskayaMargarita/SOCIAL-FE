import sjcl from "sjcl";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";
import has from "lodash/fp/has";
import omit from "lodash/fp/omit";
import keys from "lodash/fp/keys";
import set from "lodash/fp/set";
import moment from "moment";
import {
	GOOGLE_AUTH_RESPONSE_TYPES,
	REGISTRATION_METHODS,
	TOKEN_TTL,
} from "store/constants/auth.constants";

import { API_URL } from "env";

export const parseGoogleResponse = (response, responseType = "login") => {
	const method = REGISTRATION_METHODS.GOOGLE;
	const { profileObj: userData, googleId: socialId, tokenId } = response;
	const { email, familyName: lastname, givenName: firstname } = userData;
	return responseType === GOOGLE_AUTH_RESPONSE_TYPES.REG
		? {
				email,
				firstname,
				lastname,
				socialId,
				tokenId,
				method,
		  }
		: {
				socialId,
				tokenId,
				method,
		  };
};

export const parseFacebookResponse = (response, responseType = "login") => {
	const method = REGISTRATION_METHODS.FACEBOOK;
	const userName = response?.name?.split(" ");
	return responseType === GOOGLE_AUTH_RESPONSE_TYPES.REG
		? {
				email: response.email,
				firstname: userName[1],
				lastname: userName[0],
				socialId: response.id,
				tokenId: response.accessToken,
				method,
		  }
		: {
				socialId: response.id,
				tokenId: response.accessToken,
				method,
		  };
};

export const getUserAgentInfo = () => {
	const { platform, userAgent, productSub } = window.navigator;
	return {
		registration_system: "WEB",
		device: {
			system: "WEB",
			device_name: `${platform}${productSub}${userAgent}`,
			uuid_device: `${userAgent}${platform}${productSub}`,
		},
	};
};

export const encodePassword = (password) => {
	const bitArray = sjcl.hash.sha256.hash(password);
	return sjcl.codec.hex.fromBits(bitArray);
};

export const getUserToken = () => localStorage.getItem("token");

export const setUserToken = (token) => {
	localStorage.setItem("token", token);
	localStorage.setItem("expirationDate", +new Date() + TOKEN_TTL);
};

export const removeUserToken = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
};

export const isTokenValid = () => {
	return +new Date() < +localStorage.getItem("expirationDate");
};

const aggregateAvatar = (user) => {
	const { avatar } = user;
	return has("url", avatar) ? set("url", `${API_URL}${avatar.url}`, avatar) : avatar;
};

export const normalizeUserData = (user) => {
	const parsedData = {
		emailPrivacyType: get("email_privacy_type", user),
		birthdayPrivacyType: get("birthday_privacy_type", user),
		isConfirmed: get("is_confirmed", user),
		isOnline: get("is_online", user),
		avatar: aggregateAvatar(user),
		birthday: moment(get("birthday", user), "DD.MM.YYYY").valueOf(),
		isMember: get("is_member", user),
		referalCode: get("personal_referral_code", user),
		phoneNumber: get("phone_number", user),
		phonePrivacyType: get("phone_privacy_type", user),
		registrationMethod: get("registration_method", user),
		registrationTimestamp: get("registration_timestamp", user),
		feedStatistic: {
			articles: get(["feed_statistic", "articles_count"], user),
			events: get(["feed_statistic", "events_count"], user),
			posts: get(["feed_statistic", "posts_count"], user),
			votings: get(["feed_statistic", "voting_count"], user),
			total: get(["feed_statistic", "total_count"], user),
		},
		friendsStatistic: {
			friends: get(["friends_statistic", "friends_count"], user),
			unacceptedFriends: get(["friends_statistic", "unaccepted_friends_count"], user),
		},
	};

	return {
		...omit(
			[
				"email_privacy_type",
				"is_confirmed",
				"is_online",
				"is_member",
				"personal_referral_code",
				"phone_number",
				"phone_privacy_type",
				"registration_method",
				"registration_timestamp",
				"feed_statistic",
				"friends_statistic",
			],
			user,
		),
		...parsedData,
	};
};

export const prepareProfileData = (profileData) => {
	const preparedData = {};
	keys(profileData).forEach((key) => {
		const value = getOr(profileData[key], [key, "content"], profileData);
		if (value !== null) {
			preparedData[key] = value;
		}
		if (key === "avatar_image") {
			if (value) preparedData[key] = profileData.avatar_image;
		}
	}, profileData);
	return preparedData;
};
