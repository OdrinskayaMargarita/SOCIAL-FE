import { createAsyncThunk } from "@reduxjs/toolkit";
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
	getCountriesData,
} from "api";
import omit from "lodash/fp/omit";
import { normalizeApiResponse } from "utils/api.utils";
import { encodePassword, getUserAgentInfo, removeUserToken, setUserToken } from "utils/auth.utils";

import {
	CHECK_USER_EMAIL,
	CONFIRM_SECURE_CODE,
	CONTINUE_FORGOT_PASSWORD,
	CREATE_SOCIAL_ACCOUNT,
	CREATE_USER_ACCOUNT,
	FETCH_USER_PROFILE,
	FINISH_FORGOT_PASSWORD,
	GET_TRANSLATIONS,
	INIT_FORGOT_PASSWORD,
	SEND_SECURE_CODE,
	USER_LOGIN,
	USER_SOCIAL_LOGIN,
} from "../actions/auth.actions";
import { GET_COUNTRIES } from "../actions/groups.actions";
import { getTranslationsData } from "../../api/auth.api";

export const checkUserEmail = createAsyncThunk(CHECK_USER_EMAIL, async (email) => {
	const response = await checkEmail(email);
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const userLogin = createAsyncThunk(
	USER_LOGIN,
	async ({ email, password }, { rejectWithValue }) => {
		const { device } = getUserAgentInfo();
		const response = await loginUser(email, encodePassword(password), device);
		const data = await response.json();
		if (data.success) {
			const {
				data: { token },
			} = data;
			if (token) {
				setUserToken(token);
			}
			return normalizeApiResponse(omit("data.token", data));
		}
		return rejectWithValue(normalizeApiResponse(data));
	},
);

export const userSocialLogin = createAsyncThunk(
	USER_SOCIAL_LOGIN,
	async (payload, { rejectWithValue }) => {
		const { device } = getUserAgentInfo();
		const response = await loginSocialUser(payload, device);
		const data = await response.json();
		if (data.success) {
			const {
				data: { token },
			} = data;
			if (token) {
				setUserToken(token);
			}
			return normalizeApiResponse(omit("data.token", data));
		}
		return rejectWithValue(normalizeApiResponse(data));
	},
);

export const initiateForgotPassword = createAsyncThunk(INIT_FORGOT_PASSWORD, async (email) => {
	const response = await initForgotPassword(email);
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const sendCodeForgotPassword = createAsyncThunk(
	CONTINUE_FORGOT_PASSWORD,
	async (code, { getState }) => {
		const {
			auth: { secureCode },
		} = getState();
		const response = await continueForgotPassword(code, secureCode);
		const data = await response.json();
		return normalizeApiResponse(data);
	},
);

export const endForgotPassword = createAsyncThunk(
	FINISH_FORGOT_PASSWORD,
	async ({ email, password }, { getState }) => {
		const {
			auth: { secureCode },
		} = getState();
		const response = await finishForgotPassword(email, encodePassword(password), secureCode);
		const data = await response.json();
		return normalizeApiResponse(data);
	},
);

export const createAccount = createAsyncThunk(
	CREATE_USER_ACCOUNT,
	async ({ firstname, lastname, email, password }) => {
		const userAgentInfo = getUserAgentInfo();
		const registrationData = {
			...userAgentInfo,
			firstname,
			lastname,
			email,
			password: encodePassword(password),
		};

		const response = await registerUserAccount(registrationData);
		const data = await response.json();
		const {
			data: { token },
		} = data;
		if (token) {
			setUserToken(token);
		}
		return normalizeApiResponse(omit("data.token", data));
	},
);

export const createSocialAccount = createAsyncThunk(
	CREATE_SOCIAL_ACCOUNT,
	async ({ firstname, lastname, email, method, socialId, tokenId }) => {
		const userAgentInfo = getUserAgentInfo();
		const registrationData = {
			...userAgentInfo,
			firstname,
			lastname,
			email,
			id_social_user: socialId,
			id_social_token: tokenId,
			registration_method: method,
		};
		const response = await registerSocialAccount(registrationData);
		const data = await response.json();
		const {
			data: { token },
		} = data;
		if (token) {
			setUserToken(token);
		}
		return normalizeApiResponse(omit("data.token", data));
	},
);

export const sendCode = createAsyncThunk(SEND_SECURE_CODE, async () => {
	const response = await sendSecureCode();
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const confirmCode = createAsyncThunk(CONFIRM_SECURE_CODE, async (code, { getState }) => {
	const {
		auth: { secureCode },
	} = getState();
	const response = await confirmSecureCode(code, secureCode);
	const data = await response.json();
	return normalizeApiResponse(data);
});

export const fetchUserProfile = createAsyncThunk(
	FETCH_USER_PROFILE,
	async (optData, { rejectWithValue }) => {
		const response = await fetchProfile();
		const data = await response.json();
		if (data.success) {
			return normalizeApiResponse(data);
		}
		removeUserToken();
		return rejectWithValue(normalizeApiResponse(data));
	},
);

export const getTranslations = createAsyncThunk(GET_TRANSLATIONS, async () => {
	const response = await getTranslationsData();
	const data = await response.json();
	return normalizeApiResponse(data);
});
