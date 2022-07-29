import React from "react";
import { useTranslation } from "next-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
	const { t } = useTranslation();
	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default Loading;
