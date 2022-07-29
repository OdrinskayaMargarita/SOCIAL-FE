import React from "react";
import { node } from "prop-types";
import style from "./CellRenderers.module.scss";

const GroupDescription = ({ value }) => (
	<div className={style["group-description"]}>
		<span className={style["group-description-label"]}>{value}</span>
	</div>
);

GroupDescription.propTypes = {
	value: node.isRequired,
};

export default GroupDescription;
