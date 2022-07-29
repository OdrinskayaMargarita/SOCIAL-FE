import React from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

import Feed from "core-components/Feed";
import SmartComment from "components/smart/SmartComment";
import { FeedTypeContent } from "../../../core-components/Feed/components";
import SmartFeedAuthor from "./components/Head";
import SmartFeedTypeFooter from "./components/TypeFooter";

const SmartFeed = (data) => {
	return (
		<Box p={[1.5, 2.5]} borderBottom={1} borderColor="divider">
			<Feed>
				<SmartFeedAuthor {...data} />
				<FeedTypeContent {...data} />
				<SmartFeedTypeFooter {...data} />
			</Feed>
		</Box>
	);
};

export default SmartFeed;
