import React, { useCallback, useState } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments } from "store/thunks/comments.thunks";
import { changeFeedsData } from "store/reducers/feed.reducer";
import { cloneDeep } from "lodash";
import { changeArticlesData } from "store/reducers/articles.reducer";
import { changeSolutionsData } from "store/reducers/solutions.reducer";
import { changeEventsData } from "store/reducers/events.reducer";

import { getArticle } from "store/thunks/articles.thunks";
import { getSolutionData } from "store/thunks/solutions.thunks";
import { getEvent } from "store/thunks/events.thunks";
import { getPost } from "store/thunks/feed.thunks";
import Comment from "../../Comment";

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

const SmartComment = ({ type, id, comments, commentsTotal }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const author = useSelector((state) => state.auth.user);
	const { translation } = useSelector((state) => state.app);

	const [inputValue, setInputValue] = useState("");

	const commentsValueToSet = useCallback(
		(commentText) => {
			const commentsToPush = cloneDeep(comments);
			commentsToPush.push({ text: commentText });
			return commentsToPush;
		},
		[dispatch, comments],
	);

	const onChangeHandler = useCallback(
		(event) => {
			setInputValue(event.target.value);
		},
		[setInputValue],
	);

	const sendComment = useCallback(
		async (event) => {
			if (event.key === "Enter" && event.target.value.length) {
				event.preventDefault();
				setInputValue("");
				try {
					const {
						payload: { success },
					} = await dispatch(
						createComment({
							text: event.target.value,
							type,
							id,
						}),
					);
					if (success) {
						actionsByDataType[type].forEach((action) =>
							dispatch(
								action({
									key: "commentsTotal",
									value: commentsTotal + 1,
									id,
								}),
							),
						);
						updateInnerPage[type].forEach((action) => dispatch(action(id)));
						dispatch(getComments({ id, type }));
					}
				} catch (e) {
					console.error(e);
				}
			}
		},
		[dispatch, type, id, comments, commentsTotal],
	);

	return (
		<Comment
			author={author}
			imgSrc={author.avatar?.url}
			placeholder={translation?.["post.enterCommentPlaceholder"]}
			onKeydown={sendComment}
			inputValue={inputValue}
			onChange={onChangeHandler}
		/>
	);
};

export default SmartComment;
