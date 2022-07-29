import React, { useState, useEffect } from "react";
import { object } from "prop-types";
import { IconButton, Separator } from "@storybook/components";
import { useParameter, useChannel } from "@storybook/api";
import { THEME_SELECTED, PARAM_NAME, QUERY_PARAM, THEME_INIT } from "./constants";
import { writeTheme, readTheme } from "./persistance";
import oneOf from "./one-of";

const ThemesTool = ({ api }) => {
	const themeNames = useParameter(PARAM_NAME, []);
	const [currentTheme, setCurrentTheme] = useState(
		() => oneOf(themeNames, api.getQueryParam(QUERY_PARAM) || readTheme()) || themeNames[0],
	);

	const emit = useChannel({
		// eslint-disable-next-line no-use-before-define
		[THEME_INIT]: (theme) => changeTheme(theme),
	});

	const changeTheme = (theme) => {
		api.setQueryParams({ [QUERY_PARAM]: theme });
		writeTheme(theme);
		emit(THEME_SELECTED, theme);
		setCurrentTheme(theme);
	};

	useEffect(() => {
		const theme = themeNames[0];
		if (theme) changeTheme(theme);
	}, [themeNames, themeNames.length]);

	return (
		<>
			<Separator />
			{themeNames.map((theme) => (
				<IconButton
					key={theme}
					active={theme === currentTheme}
					title="Change the theme of the preview"
					onClick={() => changeTheme(theme)}
				>
					{theme}
				</IconButton>
			))}
			<Separator />
		</>
	);
};

ThemesTool.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	api: object,
};

export default ThemesTool;
