import React from "react";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { FeedHead } from "../../../../core-components/Feed/components";
import NextLink from "../../../common/NextLink";
import FeedTooltip from "./FeedTooltip";

const SmartFeedAuthor = ({ author, postedTo, createDate, updateDate, type, id }) => {
	const { translation } = useSelector((state) => state.app);
	const { user } = useSelector((state) => state.auth);
	const avatar = author?.avatar?.url;
	const { id: authorId } = author;
	const dateFormat = (date, format = "LLLL") => moment.unix(date).format(format);
	const pathPostedTo = (obj) => {
		const alias = {
			GROUP: "groups",
			ARTICLES: "articles",
		};
		return `/social/${alias[obj.type]}/${obj.id}`;
	};

	return (
		<Box display="flex" mb="35px">
			<FeedHead avatar={avatar} author={author}>
				<Box sx={{ display: "flex", flexWrap: "nowrap" }} zeroMinWidth>
					<NextLink href={user.id === author?.id ? "/profile" : `/social/users/${author?.id}`}>
						<Typography fontWeight="fontWeightBold">
							{author?.firstname} {author?.lastname}
						</Typography>
					</NextLink>
					<Typography align="center">&nbsp;{translation?.["post.postedTo"]}&nbsp;</Typography>
					{postedTo?.name ? (
						<NextLink href={pathPostedTo(postedTo)}>
							<Typography align="right" fontWeight="fontWeightBold">
								{postedTo.name}{" "}
							</Typography>
						</NextLink>
					) : (
						// TODO: change Personal feed text to translation when it will be added
						<Typography fontWeight="fontWeightBold">Personal feed</Typography>
					)}
				</Box>
				<Typography color="primary.lightblue">
					{createDate === updateDate || updateDate === 0
						? `${translation?.["post.creationDate"]}, ${dateFormat(createDate)}`
						: `${translation?.["post.updatedDate"]}, ${dateFormat(updateDate)}`}
				</Typography>
			</FeedHead>
			{authorId === user?.id && type === "ARTICLE" ? (
				<Box sx={{ marginLeft: "auto" }}>
					<FeedTooltip type={type} id={id} />
				</Box>
			) : null}
		</Box>
	);
};

export default SmartFeedAuthor;
