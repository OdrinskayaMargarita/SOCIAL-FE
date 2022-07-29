import { useRouter } from "next/router";
import { bool, elementType, func, oneOfType, string } from "prop-types";
import React, { useMemo } from "react";

import Link from "components/common/Link";
import { handleWith, prevent } from "components/utils/handlers";

function NextLink({ Component = Link, href, as, onClick, active, ...properties }) {
	const router = useRouter();

	const followLink = useMemo(
		() => (!active ? handleWith(onClick, prevent, () => router.push(href, as)) : prevent), // callback
		[href, as, onClick, active],
	);

	return <Component {...properties} href={as || href} onClick={followLink} />;
}

NextLink.propTypes = {
	Component: oneOfType([string, elementType]),
	href: string.isRequired,
	as: string,
	onClick: func,
	active: bool,
};

const NextLinkPure = (properties) => <NextLink {...properties} Component="a" />;

NextLink.Pure = NextLinkPure;

export default NextLink;
