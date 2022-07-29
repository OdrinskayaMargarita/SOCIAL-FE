import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

import emptySvg from "../../styles/assets/images/empty-feed.svg";

const Image = styled.img`
	display: block;
`;

const EmptyFeeds = () => {
	const { translation } = useSelector((state) => state.app);

	return (
		<Grid container py={9} justifyContent="center" flexDirection="column">
			<Image src={emptySvg.src} />
			<Typography textAlign="center" mt={3} variant="h3">
				{translation?.["feed.empty_state"]}
			</Typography>
		</Grid>
	);
};

export default EmptyFeeds;
