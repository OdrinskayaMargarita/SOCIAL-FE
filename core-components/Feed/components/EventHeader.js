import React from "react";
import moment from "moment";

import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";

const Image = styled.img`
	width: 100%;
	//height: 280px;
`;

export const EventHeader = ({ content }) => {
	const dateFormat = (date, format = "DD MMMM YYYY, kk:mm") => moment.unix(date).format(format);
	const { title, titleImage, address, startTimestamp, endTimestamp } = content;

	return (
		<Box>
			{titleImage?.url && <Image src={titleImage.url} alt="image" />}
			{startTimestamp || endTimestamp ? (
				<Typography mt={2.5}>{`${dateFormat(startTimestamp)} - ${dateFormat(
					endTimestamp,
				)}`}</Typography>
			) : null}
			<Typography mt={2} variant="h2">
				{title}
			</Typography>
			{/^https?:\/\//.test(address) ? (
				<Link mt={1} href={address} target="_blank" color="primary.lightblue">
					{address}
				</Link>
			) : (
				<Typography mt={1} color="primary.lightblue">
					{address}
				</Typography>
			)}
		</Box>
	);
};
