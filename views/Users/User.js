import React, { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Tab from "@mui/material/Tab";
import { EntityPageHeader as PageHeader, Loading, Scroller } from "components/common";
import { getUserData } from "store/thunks/users.thunks";
import UserHeader from "./components/UserHeader";
import Layout from "../../core-components/Layout/Layout";

const UserView = () => {
	const dispatch = useDispatch();
	const { translation } = useSelector((state) => state.app);
	const {
		query: { id },
	} = useRouter();
	const { itself: user } = useSelector((state) => state.users.data);

	const userTabs = [
		{
			menuItem: translation?.["myProfile.tabs.feed"],
			key: "FEED",
		},
		{
			menuItem: translation?.["myProfile.tabs.groups"],
			key: "GROUPS",
		},
		{
			menuItem: translation?.["myProfile.tabs.friends"],
			key: "FRIENDS",
		},
		{
			menuItem: translation?.["otherUserProfile.tabs.articles"],
			key: "ARTICLES",
		},
		{
			menuItem: translation?.["myProfile.tabs.events"],
			key: "EVENTS",
		},
		{
			menuItem: translation?.["myProfile.tabs.solutions"],
			key: "SOLUTIONS",
		},
		{
			menuItem: translation?.["otherUserProfile.tabs.contacts"],
			key: "CONTACTS",
		},
	];

	const tabs = useMemo(
		() =>
			userTabs.map((tab) => {
				return { ...tab, menuItem: tab.menuItem };
			}),
		[translation],
	);
	const [activeTab, setActiveTab] = useState(tabs[0].key);

	const handleTabChange = useCallback(
		(event, { activeIndex, panes }) => {
			setActiveTab(panes[activeIndex].key);
		},
		[setActiveTab],
	);

	useEffect(() => {
		if (id !== undefined) {
			dispatch(getUserData(id));
		}
	}, [dispatch, id]);

	return (
		<Layout>
			<Head>
				<title>{user?.name}</title>
			</Head>
			<PageHeader backLabel={translation?.["post.btnBack"]} backLink="/social/users" />
			{user ? (
				<>
					<UserHeader user={user} />
					<Tab
						menu={{ pointing: true, secondary: true }}
						panes={tabs}
						onTabChange={handleTabChange}
					/>
				</>
			) : (
				<Loading />
			)}
		</Layout>
	);
};

export default UserView;
