import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

import { SIDEBAR_MAIN_ITEMS, SIDEBAR_PROFILE_ITEMS } from "../constants";

const getSidebarMenuItems = (path) => {
	switch (path) {
		case "/profile":
		case "/messages":
		case "/wallet":
			return SIDEBAR_PROFILE_ITEMS;
		default:
			return SIDEBAR_MAIN_ITEMS;
	}
};

export const Sidebar = () => {
	const { translation } = useSelector((state) => state.app);
	const router = useRouter();
	const sidebarMenuItems = getSidebarMenuItems(router.pathname);

	return (
		<Drawer
			variant="permanent"
			anchor="left"
			open
			PaperProps={{ style: { position: "sticky", border: 0 } }}
			BackdropProps={{ style: { position: "sticky" } }}
			ModalProps={{
				container: document.getElementById("drawer-container"),
				style: { position: "sticky" },
			}}
		>
			<List>
				{sidebarMenuItems.map(({ title, Icon, url }, key) => (
					<ListItem
						key={key}
						sx={{ cursor: "pointer", paddingLeft: "0", paddingRight: "0" }}
						onClick={() => router.push(url)}
						alignItems="center"
					>
						<Box mr={1.5}>
							<Icon color={router.asPath.startsWith(url) ? "active" : "black"} />
						</Box>
						<ListItemText
							primary={translation?.[title] ?? title}
							primaryTypographyProps={{
								fontWeight: router.asPath.startsWith(url) ? "fontWeightBold" : "fontWeightRegular",
							}}
						/>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};
