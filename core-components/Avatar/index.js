import React from "react";
import { Avatar as MuiAvatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";
import techGenIcon from "../../styles/images/tech_gen_icon.svg";

const MemberAvatar = styled(MuiAvatar)(({ theme, bigAvatar }) => ({
	maxWidth: bigAvatar ? 40 : 20,
	minWidth: bigAvatar ? 40 : 20,
	minHeight: bigAvatar ? 40 : 20,
	maxHeight: bigAvatar ? 40 : 20,
}));

const getFirstLetter = (str) => str?.charAt(0) ?? "";

const AvatarItem = ({ src, firstName, lastName, bigAvatar, ...props }) => {
	return (
		<>
			<MuiAvatar alt="avatar" src={src} {...props} sx={{ backgroundColor: "#dbdbdb" }}>
				{!src && (
					<Typography
						color="text.primary"
						fontSize={bigAvatar ? "3rem" : "14px"}
						textTransform="uppercase"
					>
						{getFirstLetter(firstName)}
						{getFirstLetter(lastName)}
					</Typography>
				)}
			</MuiAvatar>
		</>
	);
};

const Avatar = ({ src, firstName, lastName, bigAvatar, isMember, ...props }) => {
	return (
		<>
			{isMember ? (
				<Badge
					bigAvatar={bigAvatar}
					overlap="circular"
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
					sx={{
						width: bigAvatar ? "100%" : "40px",
						height: bigAvatar ? "100%" : "40px",
					}}
					badgeContent={<MemberAvatar bigAvatar={bigAvatar} src={techGenIcon.src} alt="Member" />}
				>
					<AvatarItem
						firstName={firstName}
						lastName={lastName}
						src={src}
						bigAvatar={bigAvatar}
						{...props}
					/>
				</Badge>
			) : (
				<AvatarItem
					firstName={firstName}
					lastName={lastName}
					src={src}
					bigAvatar={bigAvatar}
					{...props}
				/>
			)}
		</>
	);
};

export default Avatar;
