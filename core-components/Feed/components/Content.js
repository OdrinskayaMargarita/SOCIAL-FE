import React from "react";
import { node } from "prop-types";
import Typography from "@mui/material/Typography";

const FeedContent = ({ children }) => <Typography mt={2.5}>{children}</Typography>;

FeedContent.propTypes = {
	children: node.isRequired,
};

export default FeedContent;
