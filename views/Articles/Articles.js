import React, { useCallback, useEffect } from "react";
import { SmartFeed, SmartLayout, SectionItem, SectionHeader } from "components";
import { Scroller } from "components/common";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "store/reducers/articles.reducer";
import { getArticles } from "store/thunks/articles.thunks";
import NextLink from "components/common/NextLink";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmptyFeeds from "core-components/EmptyFeeds/EmptyFeeds";

const ArticlesView = () => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const { entities, hasMore } = useSelector((state) => state.articles);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const loadArticles = useCallback(() => {
		dispatch(getArticles());
	}, [dispatch]);

	useEffect(() => {
		loadArticles();
		return () => {
			dispatch(reset());
		};
	}, [dispatch, loadArticles]);

	return (
		<SmartLayout>
			<Head>
				<title>{translation?.["articles.header"]}</title>
			</Head>
			<SectionItem>
				<SectionHeader>
					<SectionHeader.Title>{translation?.["articles.header"]}</SectionHeader.Title>
					<SectionHeader.Action>
						{isLoggedIn ? (
							<NextLink href="/social/articles/create">
								<Button variant="contained">{translation?.["articles.create_button"]}</Button>
							</NextLink>
						) : null}
					</SectionHeader.Action>
				</SectionHeader>
			</SectionItem>
			<div>
				{entities && entities.length ? (
					<Scroller
						items={entities}
						hasMore={hasMore}
						next={loadArticles}
						component={SmartFeed}
						target="feed-scroller"
					/>
				) : (
					<EmptyFeeds />
				)}
			</div>
		</SmartLayout>
	);
};

export default ArticlesView;
