import React from "react";
import { useRouter } from "next/router";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { FeedContent, FeedWysiwyg } from ".";

const FeedContentArticle = (data) => {
	const { content, id, isHideTitleImage } = data;
	const router = useRouter();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const isFeedDetails =
		Boolean(router?.query?.id && router.route === "/social/articles/[id]") && isLoggedIn;
	const { titleImage } = content;

	return (
		<FeedContent>
			<Card
				sx={{
					cursor: isFeedDetails ? "inherit" : "pointer",
				}}
				onClick={isFeedDetails ? undefined : () => router.push(`/social/articles/${id}`)}
			>
				<CardContent>
					{content.title && <Typography variant="h2">{content.title}</Typography>}
					{content.content.replaceAll(/<p>/g, "").replaceAll(/<br>/g, "").replaceAll("</p>", "")
						.length !== 0 && <FeedWysiwyg>{content.content}</FeedWysiwyg>}
					{titleImage?.url && !isHideTitleImage && (
						<CardMedia
							component="img"
							image={titleImage.url}
							alt=""
							style={{ marginTop: "16px" }}
						/>
					)}
				</CardContent>
			</Card>
		</FeedContent>
	);
};

export default FeedContentArticle;
