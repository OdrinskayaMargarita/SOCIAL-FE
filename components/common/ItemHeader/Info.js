import React from "react";
import { bool, node, oneOf, string } from "prop-types";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MuiAvatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const getFirstLetter = (str) => str?.charAt(0) ?? "";

const Avatar = ({ src, name, viewType, member = false, children }) => (
	<Grid
		item
		sx={{
			border: "4px solid #fff",
			width: 170,
			height: 170,
			mt: "-28px",
			alignSelf: ["center", "inherit"],
		}}
	>
		<MuiAvatar
			src={src}
			sx={{ border: "4px solid #fff", width: 170, height: 170, mt: "-28px" }}
			name={name}
		>
			{viewType === "FIRST_EDIT" ? (
				children
			) : (
				<Typography
					sx={{
						color: "#000",
						letterSpacing: "-5px",
						fontSize: "3rem",
					}}
				>
					{getFirstLetter(name).toUpperCase()}
				</Typography>
			)}
		</MuiAvatar>
	</Grid>
);

const Meta = ({
	type,
	title,
	subtitle = "",
	city = "",
	country = "",
	description,
	members,
	totalActivity,
	online = false,
	actionButtons,
	isEdit,
}) => (
	<Grid item ml={2} mt={3} flexGrow={1}>
		<Grid container>
			<Grid item>
				<Typography variant="h2" mb={1}>{title}</Typography>
				{online ? <span /> : null}
				<Typography variant="h3" mb={3} color="primary.lightblue">
					{type === "group" ? (
						<>
							{country}
							{city ? `, ${city}` : ""}
						</>
					) : (
						subtitle
					)}
				</Typography>
			</Grid>
			{!isEdit && <Grid sx={{ marginLeft: "auto" }}>{actionButtons}</Grid>}
		</Grid>

		<Typography mt={1}>{description}</Typography>
		{isEdit && <Grid mt={2.5}>{actionButtons}</Grid>}
		<Box color="primary.lightblue" display="flex" mb={3} alignItems="center">
			{members && (
				<Box display="flex" alignItems="center">
					<PersonOutlinedIcon fontSize="12" />
					<Typography>{members}</Typography>
				</Box>
			)}
			{totalActivity !== undefined && totalActivity !== 0 && (
				<>
					<FiberManualRecordIcon sx={{ width: 4, height: 4, m: "0 4px" }} />
					<Box display="flex" alignItems="center">
						<ArticleOutlinedIcon fontSize="12" />
						<Typography>{totalActivity}</Typography>
					</Box>
				</>
			)}
		</Box>
	</Grid>
);

Meta.propTypes = {
	type: oneOf(["group", "profile"]).isRequired,
	online: bool,
};

const ItemHeaderInfo = ({ children }) => (
	<Grid container direction={["column", "row"]}>
		{children}
	</Grid>
);

ItemHeaderInfo.Avatar = Avatar;
ItemHeaderInfo.Meta = Meta;

export default ItemHeaderInfo;
