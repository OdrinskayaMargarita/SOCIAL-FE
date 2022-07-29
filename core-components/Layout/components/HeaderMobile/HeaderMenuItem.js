import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typography from "@mui/material/Typography";

const HeaderMenuItem = ({ title, disabled, url, Icon, onClick, showArrowIcon }) => {
	const { translation } = useSelector((state) => state.app);
	const router = useRouter();
	const isActive = router.pathname.includes(url);

	return (
		<ListItem
			divider
			component={Link}
			key={title}
			onClick={(e) => {
				e.preventDefault();
				if (onClick) {
					onClick();
				} else if (!disabled && url) {
					router.push(url);
				}
			}}
		>
			{Icon && (
				<ListItemIcon
					sx={{
						minWidth: "40px",
						mr: 1,
						justifyContent: "right",
					}}
				>
					<Icon
						color={isActive ? "active" : "black"}
						sx={{
							width: "16px",
							height: "16px",
						}}
					/>
				</ListItemIcon>
			)}
			<ListItemText
				primaryTypographyProps={{
					color: disabled ? "primary.lightblue" : "primary.dark",
					fontWeight: isActive ? "fontWeightBold" : "fontWeightMedium",
				}}
				primary={
					<>
						{translation?.[title] ?? title}
						{disabled && (
							<Typography
								fontSize="8px"
								fontWeight="700"
								sx={{
									ml: 0.5,
									color: "primary.lightgreen",
									display: "inline",
									letterSpacing: "0.11em",
									verticalAlign: "top",
								}}
							>
								soon
							</Typography>
						)}
					</>
				}
			/>
			{showArrowIcon && (
				<ListItemIcon color="primary.lightblue" sx={{ minWidth: "auto" }}>
					<ArrowForwardIosIcon sx={{ width: 10, height: 10 }} />
				</ListItemIcon>
			)}
		</ListItem>
	);
};

export default HeaderMenuItem;
