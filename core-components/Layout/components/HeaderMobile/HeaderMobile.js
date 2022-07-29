import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useRouter } from "next/router";
import { openModal } from "../../../../store/reducers/app.reducer";
import ChangeLanguage from "../../../../components/ChangeLanguage/ChangeLanguage";
import { HEADER_MENU_KEYS, HeaderMenuComponents } from "./MenuContentComponents";

const HeaderMobile = () => {
	const [burgerOpened, setBurgerOpened] = useState(false);
	const [currentSubMenu, setCurrentSubMenu] = useState(HEADER_MENU_KEYS.ROOT);
	const dispatch = useDispatch();
	const CurrentHeaderMenu = HeaderMenuComponents[currentSubMenu];
	const router = useRouter();

	const setModal = (value) => {
		setBurgerOpened(false);
		dispatch(openModal(value));
	};
	const onMenuClose = () => {
		setCurrentSubMenu(HEADER_MENU_KEYS.ROOT);
		setBurgerOpened(false);
	};

	return (
		<Box
			sx={{
				position: "relative",
				height: "52px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				borderBottom: 1,
				borderColor: "divider",
			}}
		>
			<IconButton
				sx={{ position: "absolute", left: 0, ml: 1 }}
				onClick={() => setBurgerOpened(true)}
			>
				<MenuIcon />
			</IconButton>
			<Typography variant="h3" onClick={() => router.push("/social/news/")}>
				TECH GENERATION
			</Typography>
			<Drawer open={burgerOpened} anchor="left" onClose={onMenuClose}>
				<Box
					sx={{
						width: "85vw",
						height: "100vh",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Box height="73px">
						<IconButton sx={{ position: "absolute", right: 0, mt: 1, mr: 1 }} onClick={onMenuClose}>
							<CloseIcon />
						</IconButton>
					</Box>
					<CurrentHeaderMenu setCurrentSubMenu={setCurrentSubMenu} setModal={setModal} />
					<Box
						sx={{
							mt: "auto",
							p: 2,
							borderTop: 1,
							borderColor: "divider",
						}}
					>
						<ChangeLanguage />
					</Box>
				</Box>
			</Drawer>
		</Box>
	);
};

export default HeaderMobile;
