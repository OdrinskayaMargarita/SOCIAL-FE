import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { logout } from "store/reducers/auth.reducer";
import { MODAL_TYPES } from "core-components/Modal/constants";
import Avatar from "../../../Avatar";
import { HEADER_MENU_ITEMS, SIDEBAR_MAIN_ITEMS, SIDEBAR_PROFILE_ITEMS } from "../../constants";
import HeaderMenuItem from "./HeaderMenuItem";

export const HEADER_MENU_KEYS = {
	ROOT: "Root",
	SOCIAL: "Social",
	PROFILE: "Profile",
};

const Root = ({ setModal, setCurrentSubMenu }) => {
	const { isLoggedIn, user } = useSelector((state) => state.auth);
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const router = useRouter();

	return (
		<>
			<List disablePadding>
				<Divider />
				{HEADER_MENU_ITEMS.map((props) => (
					<HeaderMenuItem
						key={props.title}
						onClick={
							props.url === "/social" ? () => setCurrentSubMenu(HEADER_MENU_KEYS.SOCIAL) : null
						}
						showArrowIcon={props.url === "/social"}
						{...props}
					/>
				))}
			</List>
			<Box m={2}>
				{!user?.isMember ? (
					<Button variant="outlined" fullWidth onClick={() => setModal(MODAL_TYPES.MEMBER_MODAL)}>
						{translation?.["site_header.become_a_member_button"]}
					</Button>
				) : null}
			</Box>

			{isLoggedIn ? (
				<>
					<Stack direction="row" alignItems="center" spacing={1} m={2}>
						<Avatar src={user?.avatar?.url} firstName={user?.firstname} lastName={user?.lastName} />
						<Typography variant="h3">{user?.firstname}</Typography>
					</Stack>
					<Divider />
					<List disablePadding>
						<HeaderMenuItem
							title="authorization_menu.profile_button"
							onClick={() => setCurrentSubMenu(HEADER_MENU_KEYS.PROFILE)}
							showArrowIcon
						/>
						<HeaderMenuItem
							title="authorization_menu.logout_button"
							onClick={() => {
								dispatch(logout());
								router.push("/");
							}}
						/>
					</List>
				</>
			) : (
				<>
					<Divider />
					<HeaderMenuItem
						title="site_header.sign_in_button"
						onClick={() => setModal(MODAL_TYPES.LOGIN_MODAL)}
					/>
				</>
			)}
		</>
	);
};

const Profile = ({ setCurrentSubMenu }) => {
	const { translation } = useSelector((state) => state.app);

	return (
		<>
			<Box display="flex" alignItems="center" mb={2}>
				<IconButton onClick={() => setCurrentSubMenu(HEADER_MENU_KEYS.ROOT)}>
					<ArrowForwardIosIcon color="black" sx={{ transform: "rotate(180deg)" }} />
				</IconButton>
				<Typography variant="h2">{translation?.["authorization_menu.profile_button"]}</Typography>
			</Box>
			<Divider />
			<List disablePadding>
				{SIDEBAR_PROFILE_ITEMS.map((props) => (
					<HeaderMenuItem key={props.title} {...props} />
				))}
			</List>
		</>
	);
};

const Social = ({ setCurrentSubMenu }) => {
	const { translation } = useSelector((state) => state.app);

	return (
		<>
			<Box display="flex" alignItems="center" mb={2}>
				<IconButton onClick={() => setCurrentSubMenu(HEADER_MENU_KEYS.ROOT)}>
					<ArrowForwardIosIcon color="black" sx={{ transform: "rotate(180deg)" }} />
				</IconButton>
				<Typography variant="h2">{translation?.["site_header.social_button"]}</Typography>
			</Box>
			<Divider />
			<List disablePadding>
				{SIDEBAR_MAIN_ITEMS.map((props) => (
					<HeaderMenuItem key={props.title} {...props} />
				))}
			</List>
		</>
	);
};

export const HeaderMenuComponents = {
	[HEADER_MENU_KEYS.ROOT]: Root,
	[HEADER_MENU_KEYS.PROFILE]: Profile,
	[HEADER_MENU_KEYS.SOCIAL]: Social,
};
