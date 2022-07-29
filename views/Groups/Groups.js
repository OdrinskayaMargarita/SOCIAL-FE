import React, { useCallback, useEffect, useMemo } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { reset } from "store/reducers/group.reducer";
import { getGroups, getTopGroups } from "store/thunks/group.thunks";
import Layout from "core-components/Layout/Layout";
import { SectionItem, SectionHeader } from "components/Sections/SectionItem";
import SubSection from "components/Sections/SubSection";
import { MODAL_TYPES } from "core-components/Modal/constants";
import TabMenu from "components/TabMenu";
import { GROUPLIST_TYPES } from "store/constants/groups.constants";
import { openModal } from "store/reducers/app.reducer";
import TableGroups from "core-components/Table/TableGroups";
import TopGroupsSection from "./components/TopGroupsSection";

const GroupsView = () => {
	const dispatch = useDispatch();
	const { translation } = useSelector((state) => state.app);
	const topGroups = useSelector((state) => state.group.top);
	const userId = useSelector((state) => state.auth.user?.id);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const openCreateModal = useCallback(
		() => dispatch(openModal(MODAL_TYPES.CREATE_GROUP_MODAL)),
		[dispatch],
	);

	const tabs = useMemo(
		() => [
			{
				key: translation?.["groups.all"],
				children: <TableGroups groupListType={GROUPLIST_TYPES.ALL_GROUPS} />,
				authGuard: false,
			},
			{
				key: translation?.["myProfile.tabs.groups.title"],
				children: <TableGroups groupListType={GROUPLIST_TYPES.MY_GROUPS} {...{ userId }} />,
				authGuard: true,
			},
		],
		[translation],
	);
	useEffect(() => {
		dispatch(getTopGroups());
		return () => dispatch(reset());
	}, [dispatch]);

	return (
		<Layout>
			<Head>
				<title>{translation?.["social_left_sidebar.groups_button"]}</title>
			</Head>
			<Box p="0 20px">
				<>
					<Box p="20px 0">
						<SectionHeader>
							<SectionHeader.Title>
								{translation?.["social_left_sidebar.groups_button"]}
							</SectionHeader.Title>
							<SectionHeader.Action>
								{isLoggedIn && (
									<Button onClick={openCreateModal}>{translation?.["group.create.button"]}</Button>
								)}
							</SectionHeader.Action>
						</SectionHeader>
					</Box>
					{/* TODO: do it in future */}
					{/* <Grid container component="form" mt={1} mb={3} spacing={2}> */}
					{/*	<Grid item xs={6}> */}
					{/*		<TextField */}
					{/*			type="search" */}
					{/*			InputProps={{ */}
					{/*				startAdornment: ( */}
					{/*					<InputAdornment position="start"> */}
					{/*						<SearchIcon /> */}
					{/*					</InputAdornment> */}
					{/*				), */}
					{/*			}} */}
					{/*			fullWidth */}
					{/*			placeholder={translation?.["myChats.search"]} */}
					{/*		/> */}
					{/*	</Grid> */}
					{/*	<Grid item xs={6}> */}
					{/*		<TextField */}
					{/*			fullWidth */}
					{/*			placeholder={`${translation?.["editProfile.additionalSection.country"]}, ${translation?.["editProfile.additionalSection.cityPlaceholder"]}`} */}
					{/*		/> */}
					{/*	</Grid> */}
					{/* </Grid> */}
				</>
				<>
					<SubSection>
						<SubSection.Head>{translation?.["groups.top"]}</SubSection.Head>
						<SubSection.Body>
							<TopGroupsSection groups={[...topGroups]} />
						</SubSection.Body>
					</SubSection>
				</>
				<Box m="0 -20px">
					<TabMenu {...{ tabs }} />
				</Box>
			</Box>
		</Layout>
	);
};

export default GroupsView;
