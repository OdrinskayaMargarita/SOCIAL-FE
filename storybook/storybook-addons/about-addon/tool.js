import React, { version, useEffect } from "react";
import { Badge, Separator, WithTooltip, TooltipLinkList, IconButton } from "@storybook/components";
import { useParameter } from "@storybook/api";
import useFetch from "./useFetch";

const buildUrl = (versionUrl) => {
	const { host, origin, search } = global.location;
	const baseUrl = host.includes("local") ? "http://storybook.insightfulscience.com" : origin;
	return `${baseUrl}/${versionUrl}/${search}`;
};

const versionLinks = (versions, pkg) =>
	versions
		.slice()
		.reverse()
		.map((versionLink) => ({
			id: versionLink,
			title: versionLink,
			href: buildUrl(versionLink),
			active: versionLink === pkg.version || versionLink === pkg.release,
		}));

const AboutTool = () => {
	// eslint-disable-next-line no-shadow
	const version = useParameter("packageVersion", "n/a");
	const release = useParameter("releaseName", "n/a");
	const [versions, isLoading, error] = useFetch("/versions.json", []);

	const info = version !== release ? `${release}:${version}` : version;

	return (
		<>
			<Separator />
			{isLoading || error ? (
				<Badge status="neutral">{info}</Badge>
			) : (
				<WithTooltip
					placement="top"
					trigger="click"
					tooltip={() => <TooltipLinkList links={versionLinks(versions, { version, release })} />}
					closeOnClick
				>
					<IconButton status="neutral">
						<Badge status="neutral">{info}</Badge>
					</IconButton>
				</WithTooltip>
			)}
			<Separator />
		</>
	);
};
export default AboutTool;
