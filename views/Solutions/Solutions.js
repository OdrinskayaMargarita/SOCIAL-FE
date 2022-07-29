import React, { useCallback, useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import NextLink from "components/common/NextLink";
import { Scroller } from "components/common";
import { SmartFeed, SmartLayout, SectionItem, SectionHeader } from "components";
import { reset } from "store/reducers/solutions.reducer";
import { getSolutions } from "store/thunks/solutions.thunks";
import EmptyFeeds from "core-components/EmptyFeeds/EmptyFeeds";

const SolutionsView = () => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const { entities, hasMore } = useSelector((state) => state.solutions);
	const { isLoggedIn } = useSelector((state) => state.auth);

	const loadSolutions = useCallback(() => {
		dispatch(getSolutions());
	}, [dispatch]);

	useEffect(() => {
		loadSolutions();
		return () => {
			dispatch(reset());
		};
	}, [dispatch, loadSolutions]);

	return (
		<SmartLayout>
			<Head>
				<title>{translation?.["social_left_sidebar.solutions_button"]}</title>
			</Head>
			<SectionItem>
				<SectionHeader>
					<SectionHeader.Title>
						{translation?.["social_left_sidebar.solutions_button"]}
					</SectionHeader.Title>
					<SectionHeader.Action>
						{isLoggedIn && (
							<NextLink href="/social/solutions/create">
								<Button variant="contained">{translation?.["events.create_button"]}</Button>
							</NextLink>
						)}
					</SectionHeader.Action>
				</SectionHeader>
				{/* <SectionForm> */}
				{/*	<SmartFieldSearch /> */}
				{/* </SectionForm> */}
			</SectionItem>
			<div>
				{entities && entities.length ? (
					<Scroller
						items={entities}
						hasMore={hasMore}
						next={loadSolutions}
						component={SmartFeed}
						target="feed-scroller"
					/>
				) : (
					<Typography p={2} align="center">
						<EmptyFeeds />
					</Typography>
				)}
			</div>
		</SmartLayout>
	);
};

export default SolutionsView;
