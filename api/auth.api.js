import { API_URL } from "env";
import { authorizedRequest, request } from "utils/api.utils";

import { API_ENDPOINTS } from "./endpoints";

export const registerSocialAccount = async (data) =>
	request(`${API_URL}${API_ENDPOINTS.auth.social.create}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

export const initForgotPassword = async (email) =>
	request(`${API_URL}${API_ENDPOINTS.auth.initForgotPassword}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email }),
	});

export const continueForgotPassword = async (code, publicCode) =>
	request(`${API_URL}${API_ENDPOINTS.auth.continueForgotPassword}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			code,
			public_code: publicCode,
		}),
	});

export const finishForgotPassword = async (email, password, publicCode) => {
	return request(`${API_URL}${API_ENDPOINTS.auth.finishForgotPassword}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			public_code: publicCode,
			password,
		}),
	});
};

export const registerUserAccount = async (data) =>
	request(`${API_URL}${API_ENDPOINTS.auth.user.create}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

export const checkEmail = async (email) => {
	const url = new URL(`${API_URL}${API_ENDPOINTS.auth.user.checkEmail}`);
	url.searchParams.append("email", email);
	return request(url);
};

export const sendSecureCode = async () =>
	authorizedRequest(`${API_URL}${API_ENDPOINTS.auth.sendCode}`, {
		method: "GET",
	});

export const confirmSecureCode = async (code, publicCode) =>
	authorizedRequest(`${API_URL}${API_ENDPOINTS.auth.confirmCode}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			code,
			public_code: publicCode,
		}),
	});

export const loginUser = async (email, password, device) =>
	request(`${API_URL}${API_ENDPOINTS.auth.user.login}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
			device,
		}),
	});

export const loginSocialUser = async (data, device) =>
	request(`${API_URL}${API_ENDPOINTS.auth.social.login}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			device,
			id_social_user: data.socialId,
			id_social_token: data.tokenId,
			registration_method: data.method,
		}),
	});

export const fetchProfile = async () =>
	authorizedRequest(`${API_URL}${API_ENDPOINTS.auth.fetchProfile}`, {
		method: "GET",
	});

export const getTranslationsData = async () => {
	const url = `${API_URL}${API_ENDPOINTS.auth.getTranslations}`;
	return request(url);
};
