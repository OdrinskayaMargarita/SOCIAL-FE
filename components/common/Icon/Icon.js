import React from "react";
import { oneOf } from "prop-types";
// import { Icon as IconSemantic } from "semantic-ui-react";

const prepareNames = new Map([
	["post", "file alternate outline"],
	["user", "user outline"],
	["check", "check"],
	["cancel", "ban"],
	["search", "search"],
	["stat", "chart bar outline"],
	["like", "heart outline"],
	["comment", "comment outline"],
	["share", "share"],
	["eye", "eye"],
	["clock", "clock outline"],
	["arrow-left", "arrow left"],
	["close", "close"],
]);

const Icon = ({ name, ...props }) => <Icon name={prepareNames.get(name)} {...props} />;

Icon.propTypes = {
	name: oneOf([
		"post",
		"user",
		"check",
		"search",
		"stat",
		"cancel",
		"like",
		"comment",
		"share",
		"eye",
		"clock",
		"arrow-left",
		"close",
	]).isRequired,
};

export default Icon;
