import React from "react";

import TabsPanel from "./TabsPanel";
import PersonalProfileHeader from "./PersonalProfileHeader";

const PersonalProfileDetails = ({ user, changeMode }) => (
	<>
		<PersonalProfileHeader user={user} changeMode={changeMode} />
		<TabsPanel user={user} isPersonal showContactsDescription />
	</>
);

export default PersonalProfileDetails;
