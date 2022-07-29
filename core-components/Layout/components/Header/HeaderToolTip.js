import React from "react";
import { ClickAwayListener, MenuItem, MenuList, Tooltip } from "@mui/material";

import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import en from "../../../../styles/assets/images/en.png";
import ua from "../../../../styles/assets/images/ua.png";
import ru from "../../../../styles/assets/images/ru.png";
import ChangeLanguage from "../../../../components/ChangeLanguage/ChangeLanguage";
import { logout } from "../../../../store/reducers/auth.reducer";

const HeaderToolTip = ({ children }) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);
	const { isLoggedIn } = useSelector((state) => state.auth);
	const { currentLanguage, translation } = useSelector((state) => state.app);
	const flagList = {
		EN: en,
		UA: ua,
		RU: ru,
	};

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

	return (
		<ClickAwayListener onClickAway={handleTooltipClose}>
			<Tooltip
				PopperProps={{
					disablePortal: true,
				}}
				componentsProps={{
					tooltip: {
						sx: {
							border: "1px solid rgba(109, 144, 155, 0.3)",
							backgroundColor: "#fff",
							color: "#000",
							width: "240px",
							borderRadius: "8px",
							padding: "0px",
						},
					},
				}}
				onClose={handleTooltipClose}
				open={open}
				disableFocusListener
				disableHoverListener
				disableTouchListener
				title={
					<Box>
						{isLoggedIn && (
							<MenuList sx={{ padding: "20px 24px" }}>
								<MenuItem onClick={() => router.push("/profile")} sx={{ paddingLeft: 0 }}>
									{translation?.["authorization_menu.profile_button"]}
								</MenuItem>
								<MenuItem
									onClick={() => {
										dispatch(logout());
										router.push("/");
									}}
									sx={{ paddingLeft: 0, marginTop: "12px" }}
								>
									{translation?.["authorization_menu.logout_button"]}
								</MenuItem>
							</MenuList>
						)}
						<Divider />
						<ChangeLanguage />
					</Box>
				}
			>
				<Box sx={{ cursor: "pointer" }} onClick={handleTooltipOpen}>
					{children || <ChangeLanguage demoMode />}
				</Box>
			</Tooltip>
		</ClickAwayListener>
	);
};

export default HeaderToolTip;
