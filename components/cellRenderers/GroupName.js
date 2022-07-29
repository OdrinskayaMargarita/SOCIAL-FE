import React from "react";
import style from "./CellRenderers.module.scss";

const GroupName = ({ value }) => (
	<div className={style["group-name"]}>
		<span className={style["group-name-label"]}>{value}</span>
	</div>
);

export default GroupName;
