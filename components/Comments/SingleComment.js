import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { FeedHead } from "core-components/Feed/components";
import dateFormat from "components/utils/dateFormats";
import Avatar from "core-components/Avatar";
import NextLink from "../common/NextLink";

export const SingleComment = ({ comment }) => {
	const author = comment?.author;
	const { user } = useSelector((state) => state.auth);
	const dateCreated = useMemo(
		() => dateFormat(new Date(comment?.createDate * 1000)),
		[comment?.createDate],
	);

	return (
		<Grid mt={2} mx={2} container alignItems="center">
			<Grid item>
				<NextLink href={user.id === author?.id ? "/profile" : `/social/users/${author?.id}`}>
					<Avatar
						src={author.avatar?.url}
						firstName={author.firstname}
						lastName={author.lastname}
						isMember={author?.isMember}
					/>
				</NextLink>
			</Grid>
			<Grid item>
				<Box ml={1.5} py={1} px={2} bgcolor="rgba(116, 136, 147, 0.1)" borderRadius={4}>
					<Box display="flex">
						<NextLink href={user.id === author?.id ? "/profile" : `/social/users/${author?.id}`}>
							<Typography fontWeight="fontWeightMedium" mr={2.5}>
								{author.firstname} {author.lastname}
							</Typography>
						</NextLink>
						<FeedHead.Date>{dateCreated}</FeedHead.Date>
					</Box>
					<Typography mt={0.5}>{comment.text}</Typography>
				</Box>
			</Grid>
		</Grid>
	);
};
