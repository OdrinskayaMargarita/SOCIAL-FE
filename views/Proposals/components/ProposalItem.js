import React from "react";
import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Grid } from "@mui/material";
import { voteTypes } from "store/constants/proposals.constants";
import { useSelector } from "react-redux";
import dateFormats from "../../../components/utils/dateFormats";
import usePorposals from "../hooks/useProposals";

const ContainerFeed = styled.div`
	padding: 20px 0px;
	border-bottom: 1px solid rgba(109, 144, 155, 0.2);
	@media (max-width: 420px) {
		padding: 12px 0px 5px;
	}
`;

const Title = styled.div`
	font-family: "Montserrat";
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	color: #000000;
	padding: 0px 20px;
	@media (max-width: 420px) {
		padding: 0px 12px;
	}
`;

const Description = styled.div`
	font-family: "Montserrat";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	color: #000000;
	margin-top: 12px;
	padding: 0px 20px;
	@media (max-width: 420px) {
		padding: 0px 12px;
	}
`;

const Footer = styled(Grid)`
	font-family: "Montserrat";
	font-style: normal;
	font-weight: 500;
	font-size: 13px;
	line-height: 16px;
	color: #748893;
	margin-top: 12px;
	align-items: center;
`;

const Status = styled.div`
	color: ${({ color }) => color};
	display: flex;
	align-items: center;
	svg {
		width: 16px;
		height: 16px;
		margin-right: 4px;
	}
`;

const Dot = styled.div`
	width: 4px;
	height: 4px;
	border-radius: 50%;
	background-color: #748893;
	margin: 0px 8px;
`;

const Vote = styled(Grid)`
	margin-left: auto;
	display: flex;
	align-items: center;
	padding-right: 20px;
	div: {
		margin: 0px 4px;
	}
	@media (max-width: 420px) {
		margin-top: 18px;
		padding-top: 5px;
		justify-content: center;
		border-top: 1px solid rgba(109, 144, 155, 0.2);
	}
`;

const KeyboardDownIcon = styled(KeyboardArrowDownOutlinedIcon)`
	color: #d73434;
	cursor: pointer;
`;

const KeyboardUpIcon = styled(KeyboardArrowUpOutlinedIcon)`
	color: #6abf28;
	cursor: pointer;
`;

const StatusWrap = styled(Grid)`
	display: flex;
	align-items: center;
	padding: 0px 20px;
	@media (max-width: 420px) {
		padding: 0px 12px;
	}
`;

const ProposalItem = ({ name, description, type, status, createDate, votes: { up, down }, id }) => {
	const { t } = useTranslation();
	const { translation } = useSelector((state) => state.app);
	const { votingProposal } = usePorposals();
	const onVote = (vote) => {
		votingProposal({ id_proposal: id, vote });
	};

	const proposalType = {
		IMPROVEMENT: translation["proposals.proposal_type_improvement"],
		BUG: translation["proposals.proposal_type_bug"],
	};
	const proposalStatus = {
		NEW: {
			color: "#27AE60",
			text: translation["proposals.proposal_status_new"],
		},
		DONE: {
			color: "#3B59F5",
			text: translation["proposals.proposal_status_accepted"],
		},
		UNDER_CONSIDERATION: {
			color: "#000000",
			text: translation["proposals.proposal_status_pending"],
		},
		REJECTED: {
			color: "#EB575F",
			text: translation["proposals.proposal_status_rejected"],
		},
	};
	// The backend team said that createdDate should me multiple by 1000
	const date = dateFormats(createDate * 1000, "DD.MM.YY");
	return (
		<ContainerFeed>
			<Title>{name}</Title>
			<Description>{description}</Description>
			<Footer container>
				<StatusWrap item sm={10} xs={12}>
					<div>{proposalType[type]}</div>
					<Dot />
					<Status color={proposalStatus[status].color || "#748893"}>
						{proposalStatus[status].text}
					</Status>
					<Dot />
					<div>{date}</div>
				</StatusWrap>
				<Vote sm="auto" xs={12} item>
					<KeyboardDownIcon onClick={() => onVote(voteTypes.down)} />
					<div>{up - down}</div>
					<KeyboardUpIcon onClick={() => onVote(voteTypes.up)} />
				</Vote>
			</Footer>
		</ContainerFeed>
	);
};

export default ProposalItem;
