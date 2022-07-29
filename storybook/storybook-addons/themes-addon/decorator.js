import { useState, useEffect, useLayoutEffect } from "react";
import addons, { useParameter } from "@storybook/addons";
import QS from "querystring";
import { THEME_SELECTED, PARAM_NAME, QUERY_PARAM } from "./constants";
import { readTheme } from "./persistance";
import oneOf from "./one-of";

const readQueryParam = () => QS.parse(global.location.search)[QUERY_PARAM];

const withThemes = (storyFn) => {
	const themeNames = useParameter(PARAM_NAME, []);

	const [themeClass, setThemeClass] = useState(
		oneOf(themeNames, readQueryParam() || readTheme()) || themeNames[0] || "",
	);

	useEffect(() => {
		const channel = addons.getChannel();
		channel.emit("THEME_INIT", themeClass);
	}, []);

	useEffect(() => {
		const channel = addons.getChannel();
		channel.on(THEME_SELECTED, setThemeClass);
		return () => channel.removeListener(THEME_SELECTED, setThemeClass);
	}, [setThemeClass]);

	useLayoutEffect(() => {
		global.document.body.parentNode.className = themeClass;
	}, [themeClass]);

	return storyFn();
};

export default withThemes;
