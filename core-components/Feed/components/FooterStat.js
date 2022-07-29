import React from "react";
import { node, oneOf } from "prop-types";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Typography from "@mui/material/Typography";

const ChooseIcon = (icon) => {
	switch (icon) {
		case "comment":
			return <ChatBubbleOutlineIcon fontSize="8px" sx={{ marginRight: "5px" }} />;
		case "user":
			return <PersonOutlineIcon fontSize="8px" sx={{ marginRight: "5px" }} />;
		case "clock":
			return <AccessTimeIcon fontSize="8px" sx={{ marginRight: "5px" }} />;
		default:
			return null;
	}
};

const FeedFooterStat = ({ icon, children }) => (
	<Typography display="inline-flex" alignItems="center" mx={1} color="#c4c4c4">
		{ChooseIcon(icon)}
		{children}
	</Typography>
);

FeedFooterStat.proTypes = {
	children: node.isRequired,
};

export default FeedFooterStat;
