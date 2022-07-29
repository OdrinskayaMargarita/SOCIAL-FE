import React from "react";
import { useTranslation } from "next-i18next";

import { FRIEND_STATUS } from "store/constants/users.constants";

import { Image, Newspaper, PersonOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

const UserProfileHeader = ({ user, writeMessage }) => {
	const { t } = useTranslation();
	const { translation } = useSelector((state) => state.app);
	const isNoFriend = user.friendStatus === FRIEND_STATUS.NOT_FRIENDS;

	return (
		<div>
			<div />
			<div>
				<div>
					<img src={user.avatar?.url} alt="" />
				</div>
				<div>
					<Typography variant="h2">
						<>
							<div>
								{user.firstname} {user.lastname} {user.isOnline ? <i /> : null}
								<Button>
									{isNoFriend ? t("profile.actions.addFriend") : t("profile.actions.removeFriend")}
								</Button>
							</div>

							<>
								{user.isMember
									? translation?.["authorization_menu.cooperator_status_cooperator"]
									: translation?.["authorization_menu.cooperator_status_member"]}
							</>
						</>
					</Typography>
					<Typography>{user.about}</Typography>
					<Typography>
						<span>
							<PersonOutline />
							{user.friendsStatistic.friendsCount}
						</span>
						<span>
							<Newspaper />
							{user.feedStatistic.total}
						</span>
					</Typography>
				</div>
			</div>
			<Button onClick={writeMessage}>{t("profile.actions.writeMessage")}</Button>
		</div>
	);
};

export default UserProfileHeader;
