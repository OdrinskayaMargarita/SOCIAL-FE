import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import memberBackgroundImage from "../../../styles/images/member-background.png";
import cooperatorBackgroundImage from "../../../styles/images/cooperator-background.png";

const UserHeader = ({ user }) => {
	const { translation } = useSelector((state) => state.app);
	const { isLoggedIn } = useSelector((state) => state.auth);

	return (
		<div>
			<img alt="" src={user.isMember ? cooperatorBackgroundImage.src : memberBackgroundImage.src} />
			<div>
				<div>
					<img alt="" src={user?.avatar.url} />
				</div>
				<div>
					<div>
						<p>
							{user.firstname} {user.lastname}
						</p>
						{user.isOnline ? <div /> : ""}
						{isLoggedIn ? (
							<Button styleType="secondary">
								{translation?.["otherUserProfile.btnAddFriend"]}
							</Button>
						) : (
							" "
						)}
					</div>
					<p>
						{user.isMember
							? translation?.["otherUserProfile.currentRole_cooperator"]
							: translation?.["otherUserProfile.currentRole_member"]}
					</p>
					<div>
						{/* <Icon name="user outline" /> */}
						{user?.friendsStatistic.friendsCount}
						<span>.</span>
						{/* <Icon name="file alternate outline" /> */}
						{user?.feedStatistic.posts}
					</div>
				</div>
			</div>
			{isLoggedIn ? (
				<div>
					<Button> {translation?.["otherUserProfile.btnSendMessage"]}</Button>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default UserHeader;
