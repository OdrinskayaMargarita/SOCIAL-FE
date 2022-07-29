import React from "react";
import { useTranslation } from "next-i18next";
import { Button } from "semantic-ui-react";

import style from "./CellRenderers.module.scss";

const GroupJoinLink = (groupData) => {
	const { t } = useTranslation();
	const { value, data } = groupData;

	return (
		<div className={style["join-button-container"]}>
			<Button className={style["join-button"]} data-grooup-id={value}>
				{data && data.isFollowed ? t("common.generic.leave") : t("common.generic.join")}
			</Button>
		</div>
	);
};

export default GroupJoinLink;
