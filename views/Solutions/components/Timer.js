import React, { useState, useMemo, useEffect } from "react";
import { calculateDateFromMs } from "utils/solutions.utils";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const TimeContainerText = styled(Typography)`
	padding-right: 24px;
	position: relative;
	p {
		font-weight: 600;
		font-size: 56px;
		line-height: 68px;
		display: flex;
		align-items: center;
		text-align: center;

		background: linear-gradient(193.42deg, #8c37f5 18.74%, #3b59f5 87.99%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
		position: relative;
	}
	span {
		display: block;
		font-weight: 400;
		font-size: 12px;
		line-height: 15px;
		color: #748893;
	}
	&:not(:last-of-type) {
		p {
			&::before {
				position: absolute;
				margin: auto;
				top: 0;
				bottom: 0;
				width: 8px;
				height: 8px;
				background: linear-gradient(191.16deg, #8c37f5 -11.47%, #3b59f5 88.15%);
				right: -17px;
				content: "";
				display: block;
				border-radius: 50%;
			}
		}
	}
`;

export const SolutionTimer = ({ timestamp, endAction }) => {
	const [currentTimestamp, setCurrentTimestamp] = useState(+new Date());
	let timeInterval = null;

	const timeLeft = useMemo(() => {
		if (timestamp * 1000 - +new Date() < 60000) {
			endAction();
			return { days: 0, hours: 0, minutes: 1 };
		}
		return calculateDateFromMs(timestamp * 1000 - +new Date());
	}, [currentTimestamp, timestamp]);

	useEffect(() => {
		timeInterval = setInterval(() => {
			setCurrentTimestamp(+new Date());
		}, 10000);
		return () => clearInterval(timeInterval);
	}, [timeInterval]);

	return (
		<Grid container flexWrap="nowrap">
			<TimeContainerText>
				<p>{timeLeft?.days}</p>
				<span>Дня</span>
			</TimeContainerText>
			<TimeContainerText>
				<p>{timeLeft?.hours}</p>
				<span>часа</span>
			</TimeContainerText>
			<TimeContainerText>
				<p>{timeLeft?.minutes}</p>
				<span>минут</span>
			</TimeContainerText>
		</Grid>
	);
};
