import { addParameters, addDecorator } from "@storybook/react";
import "./styles.scss";
import withThemes from "../storybook/storybook-addons/themes-addon/decorator";

const alfaSort = (a, b) => (a > b && 1) || (a < b && -1) || 0;

addParameters({
	layout: "fullscreen",
	backgrounds: [
		{ name: "TG", value: "#3C2167" },
	],
	themes: ["tg"],
	options: {
		storySort: ([, a], [, b]) => alfaSort(a.kind, b.kind)
	},
	//packageVersion: global.PACKAGE_VERSION,
	//releaseName: global.RELEASE_NAME
});

addDecorator(withThemes);
