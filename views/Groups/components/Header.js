import React from "react";
import SearchIcon from "@mui/icons-material/Search";

import { Button } from "@mui/material";

const GroupsHeader = () => (
	<>
		<div>
			<h2>Groups</h2>
			<Button secondary>Create group</Button>
		</div>
		<div>
			<input type="text" placeholder="Search for groups" />
			<input type="text" placeholder="Country, city" />
			<Button>
				<SearchIcon />
			</Button>
		</div>
	</>
);

export default GroupsHeader;
