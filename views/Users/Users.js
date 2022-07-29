import React from "react";
import Head from "next/head";

import { SectionItem, SectionHeader } from "components/Sections/SectionItem";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { UsersList } from "./components/UsersListSection";
import Layout from "../../core-components/Layout/Layout";
import SubSection from "../../components/Sections/SubSection";

const UsersView = () => {
	const { translation } = useSelector((state) => state.app);

	return (
		<Layout>
			<Head>
				<title>{translation?.["people.header"]}</title>
			</Head>

			<SectionItem isBorderNone>
				<SectionHeader>
					<SectionHeader.Title>{translation?.["people.header"]}</SectionHeader.Title>
				</SectionHeader>
			</SectionItem>
			<Box p="0 20px">
				<SubSection>
					<SubSection.Head>{translation?.["people.all"]}</SubSection.Head>
				</SubSection>
			</Box>
			<UsersList />
		</Layout>
	);
};

export default UsersView;
