import React from "react";
import { addons, types } from "@storybook/addons";
import AboutTool from "./tool";

const ADDON_ID = "Storybook / About";

addons.register(ADDON_ID, () => {
	addons.add(`${ADDON_ID}/tool`, {
		title: "About",
		type: types.TOOL,
		match: () => true,
		render: () => <AboutTool />, // eslint-disable-line react/display-name
	});
});
