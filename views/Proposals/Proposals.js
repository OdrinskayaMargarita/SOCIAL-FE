import React, { useEffect } from "react";
import {
	SmartFeed,
	SmartLayout,
	SmartFieldSearch,
	SectionItem,
	SectionHeader,
	SectionForm,
} from "components";
import { Scroller } from "components/common";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import styled from "@emotion/styled";
import NextLink from "components/common/NextLink";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import EmptyFeeds from "core-components/EmptyFeeds/EmptyFeeds";
import useProposals from "./hooks/useProposals";
import ProposalItem from "./components/ProposalItem";

const Proposals = () => {
	const { t } = useTranslation();
	const { fetchProposals, proposals, hasMore, resetProporsal } = useProposals();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const { translation } = useSelector((state) => state.app);
	useEffect(() => {
		fetchProposals();
		return () => {
			resetProporsal();
		};
	}, []);

	return (
		<SmartLayout>
			<Head>
				<title>{translation["proposals.title"]}</title>
			</Head>
			<SectionItem>
				<SectionHeader>
					<SectionHeader.Title>{translation["proposals.title"]}</SectionHeader.Title>
					<SectionHeader.Action>
						{isLoggedIn ? (
							// TODO: will be implement in task oj creating proposal
							// <NextLink href="/social/articles/create">
							<Button variant="contained">{translation["proposals.create_button"]}</Button>
						) : // </NextLink>
						null}
					</SectionHeader.Action>
				</SectionHeader>
				{/* <SectionForm> */}
				{/*	<SectionForm.Field> */}
				{/*		<SmartFieldSearch /> */}
				{/*	</SectionForm.Field> */}
				{/* </SectionForm> */}
			</SectionItem>
			<div>
				{proposals && proposals.length ? (
					<Scroller
						items={proposals}
						hasMore={hasMore}
						next={fetchProposals}
						component={ProposalItem}
						target="feed-scroller"
					/>
				) : (
					<EmptyFeeds />
				)}
			</div>
		</SmartLayout>
	);
};

export default Proposals;
