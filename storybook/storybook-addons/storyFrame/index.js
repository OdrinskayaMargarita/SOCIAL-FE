import React from "react";
import { useParameter } from "@storybook/addons";
import { classes } from "../../components/utils/classes";

const storyFrame = (storyFn) => {
	const { padding = 4, bgColor = "" } = useParameter("storyFrame", {});
	return <div className={classes(padding && `p-${padding}`, bgColor)}>{storyFn()}</div>;
};
export default storyFrame;
