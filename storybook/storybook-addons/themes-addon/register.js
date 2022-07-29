import React from "react";
import { addons, types } from "@storybook/addons";

import { ADDON_ID, PARAM_NAME } from "./constants";
import ThemesTool from "./tool";

addons.register(ADDON_ID, (api) => {
	addons.add(`${ADDON_ID}/tool`, {
		title: "Themes",
		type: types.TOOL,
		parameterName: PARAM_NAME,
		match: () => true,
		render: () => <ThemesTool api={api} />, // eslint-disable-line react/display-name
	});
});
