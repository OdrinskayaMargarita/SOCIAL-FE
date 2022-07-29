import React from "react";
import { Icon } from "semantic-ui-react";
import { arrayOf, shape, string } from "prop-types";
import {
	VerticalNavigation,
	VerticalNavigationItem,
	VerticalNavigationItemLink,
} from "../../../components";

const ITEMS = [
	{
		label: "News feed",
		url: "/social/news",
		icon: "newspaper",
	},
	{
		label: "Groups",
		url: "/social/groups",
		icon: "object ungroup",
	},
	{
		label: "People",
		url: "/social/users",
		icon: "group",
	},
	{
		label: "Articles",
		url: "/social/articles",
		icon: "font",
	},
	{
		label: "Events",
		url: "/social/events",
		icon: "bars",
	},
	{
		label: "Solutions",
		url: "/social/solutions",
		icon: "bolt",
	},
	{
		label: "Notifications",
		url: "/social/notifications",
		icon: "osi",
	},
];

export default {
	title: "UI/Sidebar",
};

export const Default = ({ menu = ITEMS, activeTab = "/social/groups" }) => {
	return (
		<>
			<VerticalNavigation>
				{menu.map((item) => (
					<VerticalNavigationItem
						key={item.url}
						isActive={activeTab && item.url && activeTab.match(item.url)}
						{...{ ...item }}
					>
						<Icon name={item.icon} />
						<VerticalNavigationItemLink href={item.url}>{item.label}</VerticalNavigationItemLink>
					</VerticalNavigationItem>
				))}
			</VerticalNavigation>
		</>
	);
};
