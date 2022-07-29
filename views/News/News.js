import React, { useCallback, useEffect } from "react";
import {
	SmartFeed,
	SmartLayout,
	SmartFieldSearch,
	SectionItem,
	SectionHeader,
	SectionForm,
} from "components";
import { Scroller } from "components/common";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "store/reducers/feed.reducer";
import { getFeeds } from "store/thunks/feed.thunks";

import { AddPostLabel } from "core-components/Feed/components/AddPostLabel";
import EmptyFeeds from "core-components/EmptyFeeds/EmptyFeeds";

const NewsView = () => {
	const { t } = useTranslation();
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const { entities: feeds, hasMore } = useSelector((state) => state.feed);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const loadFeeds = useCallback(() => {
		dispatch(getFeeds());
	}, [dispatch]);

	useEffect(() => {
		loadFeeds();
		return () => {
			dispatch(reset());
		};
	}, [dispatch, loadFeeds]);

	return (
		<SmartLayout>
			<Head>
				<title>{translation?.["social_left_sidebar.news_feed_button"]}</title>
			</Head>
			<SectionItem>
				<SectionHeader>
					<SectionHeader.Title>
						{translation?.["social_left_sidebar.news_feed_button"]}
					</SectionHeader.Title>
				</SectionHeader>
				{/* <SectionForm> */}
				{/*	<SectionForm.Field> */}
				{/*		<SmartFieldSearch /> */}
				{/*	</SectionForm.Field> */}
				{/* </SectionForm> */}
			</SectionItem>
			{isLoggedIn && (
				<SectionItem>
					<AddPostLabel />
				</SectionItem>
			)}
			<div>
				{feeds && feeds.length ? (
					<Scroller
						items={feeds}
						hasMore={hasMore}
						next={loadFeeds}
						component={SmartFeed}
						target="feed-scroller"
						isFeedComponent
					/>
				) : (
					<EmptyFeeds />
				)}
			</div>
		</SmartLayout>
	);
};

export default NewsView;
