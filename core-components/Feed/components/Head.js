import React from "react";
import Avatar from "core-components/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const HeadTitle = styled.div`
	margin: 0 0 4px;
	font-size: 14px;
	line-height: 17px;
	color: #000000;
	display: flex;
	align-items: center;
	a {
		font-weight: 500;
		&:hover {
			color: #000000;
			text-decoration: underline;
		}
	}
	span {
		font-weight: 400;
		margin: 0px 6px;
		display: block;
	}
`;

const FeedHeadTitle = ({ children }) => <HeadTitle>{children}</HeadTitle>;

const FeedHeadDate = ({ children }) => (
	<Typography fontWeight="fontWeightNormal" color="primary.lightblue">
		{children}
	</Typography>
);

const Head = ({ avatar, author, children }) => {
	const router = useRouter();
	const { user } = useSelector((state) => state.auth);

	const onAvatarClick = () => {
		if (user.id === author.id) {
			router.push("/profile");
		} else {
			router.push(`/social/users/${author.id}`);
		}
	};
	return (
		<Grid container columnSpacing={[1, 2]} wrap="nowrap" alignItems="center">
			<Grid item sx={{ position: "relative", cursor: "pointer" }} onClick={onAvatarClick}>
				<Avatar
					src={avatar}
					firstName={author?.firstname}
					lastName={author?.lastname}
					isMember={author.isMember}
				/>
			</Grid>
			<Grid item zeroMinWidth>
				{children}
			</Grid>
		</Grid>
	);
};

Head.Title = FeedHeadTitle;
Head.Date = FeedHeadDate;

export default Head;
