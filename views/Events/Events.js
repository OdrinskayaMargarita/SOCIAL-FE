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
import { useDispatch, useSelector } from "react-redux";
import { reset } from "store/reducers/events.reducer";
import { getEvents } from "store/thunks/events.thunks";
import NextLink from "components/common/NextLink";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmptyFeeds from "core-components/EmptyFeeds/EmptyFeeds";

const EventsView = () => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const { entities, hasMore } = useSelector((state) => state.events);
	const { isLoggedIn } = useSelector((state) => state.auth);

	const loadEvents = useCallback(() => {
		dispatch(getEvents());
	}, [dispatch]);

	useEffect(() => {
		loadEvents();
		return () => {
			dispatch(reset());
		};
	}, [dispatch, loadEvents]);
	return (
		<SmartLayout>
			<Head>
				<title>{translation?.["otherUserProfile.tabs.events"]}</title>
			</Head>
			<SectionItem>
				<SectionHeader>
					<SectionHeader.Title>{translation?.["otherUserProfile.tabs.events"]}</SectionHeader.Title>
					<SectionHeader.Action>
						{isLoggedIn ? (
							<NextLink href="/social/events/create">
								<Button variant="contained">{translation?.["events.create_button"]}</Button>
							</NextLink>
						) : null}
					</SectionHeader.Action>
				</SectionHeader>
				{/* <SectionForm> */}
				{/*	<SectionForm.Field> */}
				{/*		<SmartFieldSearch /> */}
				{/*	</SectionForm.Field> */}
				{/* </SectionForm> */}
			</SectionItem>
			<div>
				{entities && entities.length ? (
					<Scroller
						items={entities}
						hasMore={hasMore}
						next={loadEvents}
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

export default EventsView;
