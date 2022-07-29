import React, { useEffect } from "react";

import TabsPanel from "./TabsPanel";
import UserProfileHeader from "./UserProfileHeader";

const UserProfileDetails = ({ user, writeMessage }) => {
	return (
		<>
			<UserProfileHeader {...{ user, writeMessage }} />
			<TabsPanel user={user} />
		</>
	);
};

export default UserProfileDetails;
