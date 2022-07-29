import React from "react";
import { node } from "prop-types";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Sidebar } from "./components/Sidebar";
import Header from "./components/Header/Header";
import HeaderMobile from "./components/HeaderMobile/HeaderMobile";

const Layout = ({ children }) => {
	const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

	return (
		<>
			{isDesktop ? <Header /> : <HeaderMobile />}
			<Container disableGutters={!isDesktop} sx={{ minHeight: "calc(100vh - 80px)" }}>
				<Grid
					container
					sx={{ height: "calc(100vh - 80px)", maxWidth: "100%", position: "sticky", top: 0 }}
					wrap="nowrap"
				>
					<Grid
						item
						xs={2}
						sm={3}
						md="auto"
						sx={{
							mr: 4,
							position: "sticky",
							top: 0,
							height: "max-content",
							display: {
								xs: "none",
								md: "block",
							},
						}}
					>
						<Sidebar />
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={9}
						lg={8}
						sx={{
							borderLeft: 1,
							borderRight: 1,
							borderColor: "divider",
							height: "max-content",
							minHeight: "100%",
							position: "relative",
						}}
					>
						{children}
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

Layout.propTypes = {
	children: node.isRequired,
};

export default Layout;
