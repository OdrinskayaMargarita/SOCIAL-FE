import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import appSlice from "./reducers/app.reducer";
import authSlice from "./reducers/auth.reducer";
import feedSlice from "./reducers/feed.reducer";
import groupSlice from "./reducers/group.reducer";
import messengerSlice from "./reducers/messenger.reducer";
import friendsSlice from "./reducers/friends.reducer";
import profileSlice from "./reducers/profile.reducer";
import usersSlice from "./reducers/users.reducer";
import articlesSlice from "./reducers/articles.reducer";
import eventsSlice from "./reducers/events.reducer";
import solutionsSlice from "./reducers/solutions.reducer";
import commentsSlice from "./reducers/comments.reducer";
import proposalsSlice from "./reducers/proposals.reducer";

const makeStore = () =>
	configureStore({
		reducer: {
			[appSlice.name]: appSlice.reducer,
			[authSlice.name]: authSlice.reducer,
			[feedSlice.name]: feedSlice.reducer,
			[groupSlice.name]: groupSlice.reducer,
			[messengerSlice.name]: messengerSlice.reducer,
			[friendsSlice.name]: friendsSlice.reducer,
			[profileSlice.name]: profileSlice.reducer,
			[usersSlice.name]: usersSlice.reducer,
			[articlesSlice.name]: articlesSlice.reducer,
			[eventsSlice.name]: eventsSlice.reducer,
			[solutionsSlice.name]: solutionsSlice.reducer,
			[commentsSlice.name]: commentsSlice.reducer,
			[proposalsSlice.name]: proposalsSlice.reducer,
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
		devTools: true,
	});

export const wrapper = createWrapper(makeStore);
