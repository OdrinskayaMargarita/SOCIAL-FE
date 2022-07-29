import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

const StyledTab = styled(Tab)`
	text-transform: none;
	font-weight: 600;
	font-size: 14px;
	&.MuiTabs-indicator {
		width: 100px;
	}
`;

const TabMenu = ({ tabs }) => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const changeActiveTab = (_, index) => setActiveTabIndex(index);
	const authTabs = useMemo(
		() => tabs.filter((element) => !element.authGuard || (element.authGuard && isLoggedIn)),
		[tabs, isLoggedIn],
	);

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={activeTabIndex}
					onChange={changeActiveTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
					sx={{
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
					{authTabs.map((tab, index) => (
						<StyledTab key={index} label={tab?.key} />
					))}
				</Tabs>
			</Box>
			<>{tabs[activeTabIndex]?.children}</>
		</Box>
	);
};

export default TabMenu;
