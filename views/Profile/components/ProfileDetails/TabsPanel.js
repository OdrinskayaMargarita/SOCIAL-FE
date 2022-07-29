import React from "react";

import { GROUPLIST_TYPES } from "store/constants/groups.constants";
import { GroupsList } from "views/Groups/components";
import { FriendsList } from "components/FriendsList/FriendsList";

import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PostedFeedsList from "./PostedFeedsList";
import ContactInformation from "./ContactInformation";
import { FriendsListSection } from "../../../../components/FriendsList/FriendsListSection";

const blue = {
	50: "#F0F7FF",
	100: "#C2E0FF",
	200: "#80BFFF",
	300: "#66B2FF",
	400: "#3399FF",
	500: "#007FFF",
	600: "#0072E5",
	700: "#0059B2",
	800: "#004C99",
	900: "#003A75",
};

const StyledTab = styled(Tab)`
	text-transform: none;
	font-weight: 600;
	font-size: 14px;
	&.MuiTabs-indicator {
		width: 100px;
	}
`;

const TabsPanel = ({ user, isPersonal = false }) => {
	const { translation } = useSelector((state) => state.app);
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<TabContext value={value}>
			<TabList
				variant="scrollable"
				defaultValue={0}
				onChange={handleChange}
				TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
				sx={{
					padding: "4px 4px 0 4px",
					borderBottom: "1px solid rgba(109,144,155,.2)",
					"& .MuiTabs-flexContainer": {
						justifyContent: "space-between",
					},
					"& .MuiTabs-indicator": {
						display: "flex",
						justifyContent: "center",
						backgroundColor: "transparent",
						height: "4px",
					},
					"& .MuiTabs-indicatorSpan": {
						maxWidth: 50,
						width: "100%",
						borderRadius: "4px 4px 0 0",
						backgroundColor: "#3b59f5",
					},
				}}
			>
				<StyledTab label={translation?.["myProfile.tabs.feed"]} />
				<StyledTab label={translation?.["myProfile.tabs.groups"]} />
				<StyledTab label={translation?.["myProfile.tabs.friends"]} />
				<StyledTab label={translation?.["otherUserProfile.tabs.articles"]} />
				<StyledTab label={translation?.["myProfile.tabs.events"]} />
				<StyledTab label={translation?.["myProfile.tabs.solutions"]} />
				<StyledTab label={translation?.["otherUserProfile.tabs.contacts"]} />
			</TabList>
			<TabPanel value={0} sx={{ padding: "0" }}>
				<PostedFeedsList
					type="ALL"
					user={user}
					id={user.id}
					title={translation?.["myProfile.tabs.feed.title"]}
				/>
			</TabPanel>
			<TabPanel value={1} sx={{ padding: "0" }}>
				<GroupsList
					groupListType={isPersonal ? GROUPLIST_TYPES.PROFILE_GROUPS : GROUPLIST_TYPES.USER_GROUPS}
					userId={user.id}
					user={user}
					title={translation?.["myProfile.tabs.groups.title"]}
				/>
			</TabPanel>
			<TabPanel value={2} sx={{ padding: "0" }}>
				<FriendsListSection
					user={user}
					id={user.id}
					title={translation?.["myProfile.tabs.friends.title"]}
				/>
			</TabPanel>
			<TabPanel value={3} sx={{ padding: "0" }}>
				<PostedFeedsList
					type="ARTICLE"
					id={user.id}
					title={translation?.["myProfile.tabs.articles.title"]}
				/>
			</TabPanel>
			<TabPanel value={4} sx={{ padding: "0" }}>
				<PostedFeedsList
					type="EVENT"
					id={user.id}
					title={translation?.["myProfile.tabs.events.title"]}
				/>
			</TabPanel>
			<TabPanel value={5} sx={{ padding: "0" }}>
				<PostedFeedsList
					type="VOTING"
					id={user.id}
					title={translation?.["myProfile.tabs.solutions.title"]}
				/>
			</TabPanel>
			<TabPanel value={6} sx={{ padding: "0" }}>
				<ContactInformation user={user} title={translation?.["myProfile.tabs.contacts.title"]} />
			</TabPanel>
		</TabContext>
	);
};

export default TabsPanel;
