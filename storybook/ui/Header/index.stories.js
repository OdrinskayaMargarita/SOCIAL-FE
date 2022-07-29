import React from "react";

import Header, {
	HeaderAuth,
	HeaderContainer,
	HeaderLogo,
	HeaderNav,
	HeaderNavButton,
	HeaderMenuItem,
	HeaderMenuItemLink,
} from "components/common/Header";
import Link from "components/common/Link";
import Avatar from "core-components/Layout/components/Avatar";

export default {
	title: "UI/Header",
};

export const Default = () => {
	return (
		<Header>
			<HeaderContainer>
				<HeaderLogo>TECH GENERATION</HeaderLogo>
				<HeaderNav>
					<HeaderMenuItem name="social" path="/social">
						<HeaderMenuItemLink>Social</HeaderMenuItemLink>
					</HeaderMenuItem>
					<HeaderMenuItem name="about">
						<HeaderMenuItemLink href="/about">About</HeaderMenuItemLink>
					</HeaderMenuItem>
					<HeaderMenuItem name="market" disabled>
						Market
					</HeaderMenuItem>
					<HeaderMenuItem name="p2p" disabled>
						P2P
					</HeaderMenuItem>
				</HeaderNav>
				<HeaderAuth>
					<HeaderNavButton>Become a member</HeaderNavButton>
					<HeaderNavButton basic>
						<Link href="login">Login</Link>
					</HeaderNavButton>
				</HeaderAuth>
			</HeaderContainer>
		</Header>
	);
};

export const About = () => {
	return (
		<Header>
			<HeaderContainer>
				<HeaderLogo>TECH GENERATION</HeaderLogo>
				<HeaderNav>
					<HeaderMenuItem name="social">
						<HeaderMenuItemLink>Social</HeaderMenuItemLink>
					</HeaderMenuItem>
					<HeaderMenuItem name="about" path="/about">
						<HeaderMenuItemLink href="/about">About</HeaderMenuItemLink>
					</HeaderMenuItem>
					<HeaderMenuItem name="market" disabled>
						Market
					</HeaderMenuItem>
					<HeaderMenuItem name="p2p" disabled>
						P2P
					</HeaderMenuItem>
				</HeaderNav>
				<HeaderAuth>
					<HeaderNavButton>Become a member</HeaderNavButton>
				</HeaderAuth>
			</HeaderContainer>
		</Header>
	);
};
export const isLogin = () => {
	return (
		<Header>
			<HeaderContainer>
				<HeaderLogo>TECH GENERATION</HeaderLogo>
				<HeaderNav>
					<HeaderMenuItem name="social">
						<HeaderMenuItemLink>Social</HeaderMenuItemLink>
					</HeaderMenuItem>
					<HeaderMenuItem name="about" path="/about">
						<HeaderMenuItemLink href="/about">About</HeaderMenuItemLink>
					</HeaderMenuItem>
					<HeaderMenuItem name="market" disabled>
						Market
					</HeaderMenuItem>
					<HeaderMenuItem name="p2p" disabled>
						P2P
					</HeaderMenuItem>
				</HeaderNav>
				<HeaderAuth>
					<HeaderNavButton>Become a Member</HeaderNavButton>
				</HeaderAuth>
			</HeaderContainer>
		</Header>
	);
};
