import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

const Translate = ({ string }) => {
	const { translation } = useSelector((state) => state.app);
	return <Typography>{translation?.[string] ?? string}</Typography>;
};

export default Translate;
