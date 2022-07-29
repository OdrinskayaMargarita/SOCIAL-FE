import React from "react";
import { bool, node, string } from "prop-types";
import { styled, css } from "@mui/material/styles";
import { useRouter } from "next/router";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const MenuItem = styled(Link)`
	position: relative;
	&:before {
		position: absolute;
		top: 45px;
		left: 50%;
		transform: translateX(-50%);
		content: "";
		display: ${(props) => (props.active ? "block" : "none")};
		height: 4px;
		width: 50px;
		border-radius: 50% 50% 0 0;
		background-color: #3b59f5;
	}
	${(props) =>
		props.disabled &&
		css`
			color: rgba(109, 144, 155, 0.4);
			cursor: default;
		`}
`;

const ItemAlt = styled(Box)`
	position: absolute;
	top: -50%;
	left: 100%;
	font-weight: bold;
	font-size: 8px;
	letter-spacing: 0.11em;
	color: #00c8d5;
`;

const HeaderMenuItem = ({ url, disabled = false, alt = "", title }) => {
	const router = useRouter();
	const isActive = router.pathname.includes(url);

	const onItemClick = (e) => {
		e.preventDefault();
		if (!disabled) {
			router.push(url);
		}
	};

	return (
		<MenuItem
			href={url}
			disabled={disabled}
			active={isActive}
			onClick={onItemClick}
			underline="none"
			color="inherit"
		>
			{title}
			{alt && <ItemAlt>{alt}</ItemAlt>}
		</MenuItem>
	);
};

HeaderMenuItem.propTypes = {
	title: string,
	url: string,
	alt: string,
	disabled: bool,
};

export default HeaderMenuItem;
