import { useTranslation } from "next-i18next";
import React from "react";
import style from "./CancelButton.module.scss";

const CancelButton = ({ onClick }) => {
	const { t } = useTranslation();
	return (
		<button onClick={() => onClick()} className={style.button} type="button">
			{t("articles.create.cancel")}
		</button>
	);
};

export default CancelButton;
