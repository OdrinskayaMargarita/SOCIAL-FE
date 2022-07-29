import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { SmartFeed, SmartLayout } from "components";
import { Loading } from "components/common";
import { CommentsList } from "components/Comments/CommentsList";
import { getEvent } from "store/thunks/events.thunks";

import ItemHeader, { ItemHeaderBack } from "../../components/common/ItemHeader";

const Event = () => {
	const dispatch = useDispatch();
	const {
		query: { id },
	} = useRouter();

	const event = useSelector((state) => state.events.data.itself);

	useEffect(() => {
		if (id !== undefined) {
			dispatch(getEvent(id));
		}
	}, [dispatch, id]);

	return (
		<SmartLayout>
			<Head>
				<title>{event?.name}</title>
			</Head>
			{event ? (
				<>
					<ItemHeader>
						<ItemHeaderBack tab="events" />
					</ItemHeader>
					<SmartFeed {...event} isVisibleCreateComment={false} />
					<CommentsList {...event} />
				</>
			) : (
				<Loading />
			)}
		</SmartLayout>
	);
};

export default Event;
