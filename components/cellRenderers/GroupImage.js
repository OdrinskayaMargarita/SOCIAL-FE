import React from "react";
import { Image } from "@mui/icons-material";
import style from "./CellRenderers.module.scss";

const GroupImage = ({ value }) => {
	return <img src={value} alt="" />;
};

export default GroupImage;
