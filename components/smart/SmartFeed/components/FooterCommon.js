import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFeedsData } from "store/reducers/feed.reducer";
import { setLike, getPost } from "store/thunks/feed.thunks";
import { changeEventsData } from "store/reducers/events.reducer";
import { changeArticlesData } from "store/reducers/articles.reducer";
import { changeSolutionsData } from "store/reducers/solutions.reducer";
import { getArticle } from "store/thunks/articles.thunks";
import { getSolutionData } from "store/thunks/solutions.thunks";
import { getEvent } from "store/thunks/events.thunks";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FeedFooter, FeedFooterAction } from "../../../../core-components/Feed/components";

const actionsByDataType = {
	ARTICLE: [changeArticlesData],
	VOTING: [changeSolutionsData],
	EVENT: [changeEventsData],
	POST: [changeFeedsData],
};

const updateInnerPage = {
	ARTICLE: [getArticle],
	VOTING: [getSolutionData],
	EVENT: [getEvent],
	POST: [getPost],
};

const SmartFeedFooterCommon = ({
	type,
	id,
	commentsTotal,
	isFeedComponent,
	views,
	sharings,
	likes,
	isLiked,
}) => {
	const dispatch = useDispatch();
	const [likeInfo, setLikeInfo] = useState({ likes, isLiked });
	const onLikeHandler = useCallback(async () => {
		try {
			const {
				payload: { success },
			} = await dispatch(setLike({ id, type }));
			if (success) {
				setLikeInfo({
					likes: likeInfo.isLiked ? likeInfo.likes - 1 : likeInfo.likes + 1,
					isLiked: !likeInfo.isLiked,
				});
				actionsByDataType[isFeedComponent ? "POST" : type].forEach((action) => {
					dispatch(
						action({
							key: "likes",
							value: isLiked ? likes - 1 : likes + 1,
							id,
						}),
					);
					dispatch(action({ key: "isLiked", value: !isLiked, id }));
				});
				updateInnerPage[type].forEach((action) => dispatch(action(id)));
			}
		} catch (error) {
			console.error(error);
		}
	}, [type, id, dispatch, likes, isLiked, likeInfo]);

	return (
		<FeedFooter>
			<FeedFooter.Col>
				<Grid container>
					<FeedFooterAction onClick={onLikeHandler}>
						<FavoriteBorderOutlinedIcon
							color={likeInfo.isLiked ? "error" : "#748893"}
							fontSize="8px"
							sx={{ marginRight: "5px" }}
						/>
						<Typography>{likeInfo.likes}</Typography>
					</FeedFooterAction>
					<FeedFooterAction>
						<ChatBubbleOutlineRoundedIcon fontSize="8px" sx={{ marginRight: "5px" }} />
						<Typography>{commentsTotal}</Typography>
					</FeedFooterAction>
					{/* TODO: I hide it temporarily, unccoment when it will be nedded */}
					{/* <FeedFooterAction fontSize="15px">
						<ReplyOutlinedIcon fontSize="8px" sx={{ marginRight: "5px" }} />
						<Typography>{sharings}</Typography>
					</FeedFooterAction> */}
				</Grid>
			</FeedFooter.Col>
			<FeedFooter.ColAuto>
				<FeedFooterAction>
					<VisibilityOutlinedIcon fontSize="8px" sx={{ marginRight: "5px" }} />
					<Typography>{views}</Typography>
				</FeedFooterAction>
			</FeedFooter.ColAuto>
		</FeedFooter>
	);
};

export default SmartFeedFooterCommon;
