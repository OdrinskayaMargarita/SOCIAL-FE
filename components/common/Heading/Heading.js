import React from "react";
import { bool, elementType, oneOf, oneOfType, string } from "prop-types";
import pureFC from "components/utils/pureFC";

const Heading = ({
	Tag,
	size,
	center,
	uppercase = false,
	className,

	...props
}) => (
	<Tag
		className={[
			"heading",
			size && `heading-${size}`,
			center && "text-center",
			uppercase && "text-uppercase",
			className,
		].join(" ")}
		{...props}
	/>
);

Heading.propTypes = {
	Tag: oneOfType([oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]), elementType]).isRequired,
	size: oneOf(["xs", "s", "m", "l", "xl", "xxl", "xxxl"]),
	center: bool,
	uppercase: bool,
	className: string,
};

export default pureFC(Heading);
