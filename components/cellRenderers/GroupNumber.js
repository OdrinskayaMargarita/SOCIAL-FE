import React from "react";
import style from "./CellRenderers.module.scss";

const GroupNumber = ({ value }) => (
	<div className={style["group-number"]}>
		<span className={style["group-number-label"]}>{value}</span>
	</div>
);

export default GroupNumber;
