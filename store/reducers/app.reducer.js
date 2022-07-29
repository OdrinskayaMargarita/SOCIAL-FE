/* eslint-disable no-param-reassign */
import { createSlice, isAllOf, isAnyOf, isFulfilled } from "@reduxjs/toolkit";

import { saveLanguageToStorage, getInitialLanguage } from "utils/lang";
import { fetchUserProfile, getTranslations } from "../thunks/auth.thunks";

const initialState = {
	isLoading: false,
	isInitialLoaded: false,
	isModalOpen: false,
	modalType: null,
	currentLanguage: getInitialLanguage(),
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		changeLanguage(state, { payload: chosenLanguage }) {
			state.currentLanguage = chosenLanguage;
			state.translation = state?.list[chosenLanguage];
			saveLanguageToStorage(chosenLanguage);
		},
		loadStart(state) {
			state.isLoading = true;
		},
		loadEnd(state) {
			state.isLoading = false;
		},
		openModal(state, action) {
			state.isModalOpen = true;
			state.modalType = action.payload;
		},
		closeModal(state) {
			state.isModalOpen = false;
			state.modalType = null;
		},
		startUp(state) {
			state.isInitialLoaded = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getTranslations.fulfilled, (state, { payload }) => {
			state.list = payload.data;
			state.translation = payload.data[state?.currentLanguage];
		});
	},
});

export const { loadStart, loadEnd, openModal, closeModal, changeLanguage, startUp } =
	appSlice.actions;

export default appSlice;
