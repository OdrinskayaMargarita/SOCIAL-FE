import React from "react";
import { parseVotingData } from "utils/feed.utils";
import NextLink from "../../../components/common/NextLink";

import { FeedContent } from ".";

const FeedContentSolution = (data) => {
	const { id, name } = parseVotingData(data);
	return (
		<FeedContent>
			<div>
				<NextLink href={`/social/solutions/${id}`}>{name}</NextLink>
			</div>
		</FeedContent>
	);
};

export default FeedContentSolution;
