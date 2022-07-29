import React from "react";
import { useTranslation } from "next-i18next";

import NextLink from "../../../components/common/NextLink";

const ProfileDropdown = ({ dropdownItems }) => {
	const { t } = useTranslation();
	const list = dropdownItems.map((item, index) => (
		<NextLink href={item.url} key={index} onClick={() => item.action()}>
			{t(item.key)}
		</NextLink>
	));

	return <ul>{list}</ul>;
};

export default ProfileDropdown;
