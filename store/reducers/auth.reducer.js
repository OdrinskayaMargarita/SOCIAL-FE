/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { removeUserToken, normalizeUserData } from "utils/auth.utils";

import {
	confirmCode,
	createAccount,
	createSocialAccount,
	fetchUserProfile,
	initiateForgotPassword,
	sendCode,
	userLogin,
	userSocialLogin,
} from "../thunks/auth.thunks";
import { updateProfileData } from "../thunks/profile.thunks";

const initialState = {
	isLoggedIn: false,
	user: {},
	secureCode: undefined,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: () => {
			removeUserToken();
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createAccount.fulfilled, (state, { payload }) => {
			state.user = normalizeUserData(payload.data.user);
		});
		builder.addCase(createSocialAccount.fulfilled, (state, { payload }) => {
			state.user = normalizeUserData(payload.data.user);
			state.isLoggedIn = payload.success;
		});
		builder.addCase(sendCode.fulfilled, (state, { payload }) => {
			state.secureCode = payload.data;
		});
		builder.addCase(confirmCode.fulfilled, (state, { payload }) => {
			state.isLoggedIn = payload.success;
		});
		builder.addCase(userLogin.fulfilled, (state, { payload }) => {
			state.user = normalizeUserData(payload.data.user);
			state.isLoggedIn = payload.success;
		});
		builder.addCase(userLogin.rejected, (state) => {
			state.user = {};
			state.isLoggedIn = false;
		});
		builder.addCase(userSocialLogin.fulfilled, (state, { payload }) => {
			state.user = normalizeUserData(payload.data.user);
			state.isLoggedIn = payload.success;
		});
		builder.addCase(userSocialLogin.rejected, (state) => {
			state.user = {};
			state.isLoggedIn = false;
		});
		builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
			state.user = normalizeUserData(payload.data);
			state.isLoggedIn = true;
		});
		builder.addCase(fetchUserProfile.rejected, (state) => {
			state.user = {};
			state.isLoggedIn = false;
		});
		builder.addCase(initiateForgotPassword.fulfilled, (state, { payload }) => {
			state.secureCode = payload.data;
		});
		builder.addCase(updateProfileData.fulfilled, (state, { payload }) => {
			if (!payload?.data) return;
			state.user = normalizeUserData(payload.data);
		});
	},
});

export const { logout } = authSlice.actions;

export default authSlice;
