import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
	VerticalNavigation,
	VerticalNavigationItem,
	VerticalNavigationItemIcon,
	VerticalNavigationItemLink,
} from "components/common/VerticalNavigation";
import NextLink from "components/common/NextLink";

const SmartNavigation = ({ menu }) => {
	const { t } = useTranslation();
	const router = useRouter();
	const activeTab = router.pathname;
	const isActive = (url = "") => {
		if (activeTab && url) {
			const matched = activeTab.match(url);
			return !!(matched && matched.length > 0);
		}
		return false;
	};
	return (
		<VerticalNavigation>
			{menu.map((item) => (
				<VerticalNavigationItem key={item.url} isActive={isActive(item.url)}>
					<NextLink href={item.url} Component={VerticalNavigationItemLink}>
						{item?.icon ? <VerticalNavigationItemIcon name={item.icon} /> : null}{" "}
						{`${t(item.label)}${item.extraMarker ? item.extraMarker : ""}`}
					</NextLink>
				</VerticalNavigationItem>
			))}
		</VerticalNavigation>
	);
};

export default SmartNavigation;
