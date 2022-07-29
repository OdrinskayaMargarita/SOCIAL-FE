import React from "react";
import moment from "moment";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import CheckIcon from "@mui/icons-material/Check";
import { BorderColor, Search } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

import { FeedFooter, FeedFooterStat } from "../../../../core-components/Feed/components";

const CustomSpan = styled.span`
	display: inline-flex;
	align-items: center;
	margin-right: 10px;
	font-weight: 600;
	font-size: 13px;
	text-transform: uppercase;
	line-height: 16px;
	gap: 5px;
	span {
		margin-left: 5px;
	}
`;
// const prepareClassName = new Map([
// 	["VOTING_IN_PROGRESS", "progress"],
// 	["SOLUTION_NOT_FOUND", "not-found"],
// 	["PROPOSING_SOLUTIONS", "proposing"],
// 	["SOLUTION_FOUND", "found"],
// 	["CREATED", "created"],
// ]);

const prepareIcon = new Map([
	["VOTING_IN_PROGRESS", "stat"],
	["SOLUTION_NOT_FOUND", "cancel"],
	["SOLUTION_FOUND", "check"],
	["CREATED", "search"],
]);

const SolutionStatus = ({ status }) => {
	const { translation } = useSelector((state) => state.app);
	switch (prepareIcon.get(status)) {
		case "stat":
			return (
				<CustomSpan style={{ color: "blue" }}>
					<BorderColor fontSize="8px" />
					<Typography>
						{" "}
						{translation?.["solution_in_progress.details.voting_in_progress"]}
					</Typography>
				</CustomSpan>
			);
		case "cancel":
			return (
				<CustomSpan style={{ color: "red" }}>
					<DoDisturbIcon fontSize="8px" />
					<Typography> {translation?.["solution.details.decision_not_made"]}</Typography>
				</CustomSpan>
			);
		case "check":
			return (
				<CustomSpan style={{ color: "green" }}>
					<CheckIcon fontSize="8px" />
					<Typography> {translation?.["solution.details.decision_made"]}</Typography>
				</CustomSpan>
			);
		case "search":
			return (
				<CustomSpan style={{ color: "blue" }}>
					<CheckIcon fontSize="8px" />
					<Typography> {translation?.["solutions.offer_solutions"]}</Typography>
				</CustomSpan>
			);
		default:
			return null;
	}
};

const calcTime = (endTimestamp) => {
	const dateFormat = "DD/MM/YYYY HH:mm:ss";
	const dateNow = moment(new Date(), dateFormat);
	const dateEnd = moment.unix(endTimestamp).format(dateFormat);
	const durationHours = moment(dateEnd, dateFormat).diff(dateNow, "hours");
	const durationDays = moment(dateEnd, dateFormat).diff(dateNow, "days");
	return [durationHours, durationDays];
};

const getNoun = (number) => {
	let n = Math.abs(number);
	n %= 100;
	if (n >= 5 && n <= 20) {
		return "дней";
	}
	n %= 10;
	if (n === 1) {
		return "день";
	}
	if (n >= 2 && n <= 4) {
		return "дня";
	}
	return "дней";
};

const getNounRemaining = (number) => {
	let n = Math.abs(number);
	n %= 100;
	if (n >= 5 && n <= 20) {
		return "Осталось";
	}
	n %= 10;
	if (n === 1) {
		return "Остался";
	}
	if (n >= 2 && n <= 4) {
		return "Осталось";
	}
	return "Осталось";
};

const SmartFeedFooterSolution = ({ content, comments = [], views = 0, commentsTotal }) => {
	const { endTimestamp } = content;
	const [durationHours, durationDays] = calcTime(endTimestamp);
	return (
		<FeedFooter>
			<FeedFooter.Col>
				<SolutionStatus status={content.status} />
				<FeedFooterStat icon="clock">
					{durationHours > 24 ? (
						<>
							{getNounRemaining(durationDays)} {durationDays} {getNoun(durationDays)}
						</>
					) : null}
					{durationHours > 0 && durationHours <= 24 ? <>Осталось {durationHours} часов</> : null}
					{durationHours <= 0 ? <>Осталось 0 часов</> : null}
				</FeedFooterStat>
				<FeedFooterStat icon="comment">{commentsTotal}</FeedFooterStat>
				<FeedFooterStat icon="user">{views}</FeedFooterStat>
			</FeedFooter.Col>
		</FeedFooter>
	);
};

export default SmartFeedFooterSolution;
