import React from "react";
import RoomIcon from "@mui/icons-material/Room";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import moment from "moment";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";

const ContactInformationItem = ({ title, children, Icon }) => {
	return (
		<Box py={2.5} px={3}>
			<Box display="flex" direction="row" alignItems="center">
				<Icon sx={{ width: 16, height: 16, mr: 1, color: "primary.lightblue" }} />
				<Typography color="primary.lightblue">{title}</Typography>
			</Box>
			<Box sx={{ ml: 1, pl: "16px" }}>
				<Typography variant="body2">{children}</Typography>
			</Box>
		</Box>
	);
};

const ContactInformation = ({ user, title }) => {
	const { translation } = useSelector((state) => state.app);

	return (
		<>
			<Typography p={3} variant="h2">
				{title}
			</Typography>
			<Divider />
			{user.country?.name && (
				<ContactInformationItem
					Icon={RoomIcon}
					title={translation?.["otherUserProfile.tabs.contacts.location"]}
				>
					{user.country?.name}
					{user.city ? `, ${user.city}` : null}
				</ContactInformationItem>
			)}
			{user?.phoneNumber && user?.phonePrivacyType !== "HIDDEN" && (
				<ContactInformationItem
					Icon={LocalPhoneIcon}
					title={translation?.["otherUserProfile.tabs.contacts.phone"]}
				>
					{user.phoneNumber}
				</ContactInformationItem>
			)}
			{user?.email && user?.emailPrivacyType !== "HIDDEN" && (
				<ContactInformationItem
					Icon={AlternateEmailIcon}
					title={translation?.["myProfile.tabs.contacts.email"]}
				>
					{user.email}
				</ContactInformationItem>
			)}
			{!Number.isNaN(user?.birthday) && user?.birthday_privacy_type !== "HIDDEN" && (
				<ContactInformationItem
					Icon={CalendarMonthOutlinedIcon}
					title={translation?.["myProfile.tabs.contacts.birthday"]}
				>
					{moment(user?.birthday).format("DD.MM.YYYY")}
				</ContactInformationItem>
			)}
			<Typography p={3} color="primary.lightblue">
				{translation?.["myProfile.tabs.contacts.hint"]}
			</Typography>
		</>
	);
};

export default ContactInformation;
