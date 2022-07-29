import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { SectionHeader, SectionItem, SmartFeed } from "components";
import { Scroller } from "components/common";

import { reset } from "store/reducers/profile.reducer";
import { getUsersFeed } from "store/thunks/profile.thunks";
import Button from "@mui/material/Button";
import EmptyFeeds from "core-components/EmptyFeeds/EmptyFeeds";
import { AddPostLabel } from "../../../../core-components/Feed/components/AddPostLabel";

const PostedFeedsList = ({ type, id, user, title }) => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const { entities: feeds, hasMore } = useSelector((state) => state.profile);

	const loadFeedsData = useCallback(() => {
		dispatch(getUsersFeed({ type, id }));
	}, [type, dispatch, id]);

	useEffect(() => {
		loadFeedsData();
		return () => dispatch(reset());
	}, [type, dispatch]);

	return (
		<>
			<Box p={3} borderBottom="1px solid rgba(109, 144, 155, 0.2)">
				<SectionHeader>
					<SectionHeader.Title>{title}</SectionHeader.Title>
					{/* {type === "ALL" && !user?.friendStatus && <Button variant="grey">Настроить</Button>} */}
				</SectionHeader>
			</Box>
			{type === "ALL" && !user?.friendStatus && (
				<SectionItem>
					<AddPostLabel />
				</SectionItem>
			)}

			<div>
				{feeds && feeds.length ? (
					<Scroller items={feeds} hasMore={hasMore} next={loadFeedsData} component={SmartFeed} />
				) : (
					<EmptyFeeds />
				)}
			</div>
		</>
	);
};

export default PostedFeedsList;
