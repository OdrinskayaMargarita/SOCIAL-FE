import React, { useEffect } from "react";
import { getComments } from "store/thunks/comments.thunks";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";

import { SmartComment } from "components/smart";
import { Box, Divider, Typography } from "@mui/material";
import { SingleComment } from "./SingleComment";

const Wrap = styled.div`
	border-top: rgba(109, 144, 155, 0.1);
`;

export const CommentsList = (data) => {
	const { id, type } = data;
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const commentList = useSelector((state) => state.comments.entities);

	useEffect(() => {
		if (window.location.hash === "#comments") {
			setTimeout(() => {
				document.getElementById("comments").scrollIntoView({ behavior: "smooth" });
			}, 100);
		}
		dispatch(getComments({ id, type }));
	}, [dispatch]);

	return (
		<Wrap>
			<Typography variant="h3" m={2}>
				Comments
			</Typography>
			{isLoggedIn && (
				<Box marginX={2} mb={2}>
					<SmartComment {...data} />
				</Box>
			)}
			<Divider />
			{commentList.length
				? commentList.map((comment, idx) => <SingleComment key={idx} comment={comment} />)
				: null}
		</Wrap>
	);
};
