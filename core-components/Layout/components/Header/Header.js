import React from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { openModal } from "store/reducers/app.reducer";
import { MODAL_TYPES } from "core-components/Modal/constants";

import HeaderMenuItem from "./HeaderMenuItem";
import Avatar from "../../../Avatar";
import HeaderToolTip from "./HeaderToolTip";
import { HEADER_MENU_ITEMS } from "../../constants";

const HeaderWrapper = styled.header`
	height: 81px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(109, 144, 155, 0.2);
	font-family: "Montserrat", "Helvetica Neue", sans-serif;
`;

const Header = () => {
	const { isLoggedIn, user } = useSelector((state) => state.auth);
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const router = useRouter();

	const changeModal = (value) => {
		dispatch(openModal(value));
	};

	return (
		<HeaderWrapper>
			<Grid container px={5} spacing={1}>
				<Grid
					item
					md={4}
					xs={12}
					sx={{
						alignItems: "center",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Typography
						noWrap
						variant="h3"
						onClick={() => router.push("/social/news/")}
						sx={{ cursor: "pointer" }}
					>
						TECH GENERATION
					</Typography>
				</Grid>
				<Grid
					item
					md={4}
					sx={{
						alignItems: "center",
						gap: 5,
						display: {
							xs: "none",
							md: "flex",
						},
					}}
				>
					{HEADER_MENU_ITEMS.map(({ url, title, disabled, alt }) => (
						<HeaderMenuItem
							key={title}
							url={url}
							title={translation?.[title] ?? title}
							alt={translation?.[alt] ?? alt}
							disabled={disabled}
						/>
					))}
				</Grid>
				<Grid
					item
					md={4}
					sx={{
						alignItems: "center",
						justifyContent: "flex-end",
						gap: 6,
						display: {
							xs: "none",
							md: "flex",
						},
					}}
				>
					{!user?.isMember ? (
						<Button variant="outlined" mr={1} onClick={() => changeModal(MODAL_TYPES.MEMBER_MODAL)}>
							{translation?.["site_header.become_a_member_button"]}
						</Button>
					) : null}
					{isLoggedIn ? (
						<HeaderToolTip>
							<Stack direction="row" alignItems="center" spacing={1}>
								<Avatar
									src={user?.avatar?.url}
									firstName={user?.firstname}
									lastName={user?.lastname}
								/>
								<Typography variant="h3">{user?.firstname}</Typography>
							</Stack>
						</HeaderToolTip>
					) : (
						<>
							<Typography
								lineHeight="24px"
								fontSize="16px"
								onClick={() => changeModal(MODAL_TYPES.LOGIN_MODAL)}
								sx={{ cursor: "pointer", minWidth: "75px" }}
							>
								{translation?.["site_header.sign_in_button"]}
							</Typography>
							<HeaderToolTip />
						</>
					)}
				</Grid>
			</Grid>
		</HeaderWrapper>
	);
};

export default Header;
