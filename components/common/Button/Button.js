import React from "react";
import { oneOfType, oneOf, elementType, bool, string } from "prop-types";
import forwardRefPropType from "../../utils/forward-ref";
import pureFC from "../../utils/pureFC";

const Button = ({
	Tag = "button",
	styleType = "primary",
	type = "button",
	className = "",
	isOutline = false,
	isBlock = false,
	disabled = false,
	forwardRef,
	...props
}) => {
	const classNameStyleType = styleType ? `button-${styleType}` : null;
	const tabType = Tag !== "a" && { type };
	return (
		<Tag
			{...tabType}
			ref={forwardRef}
			// className={classnames(
			// 	style.button,
			// 	styleType && !isOutline && style[`button-${styleType}`],
			// 	isOutline && style[`button-${styleType}-outline`],
			// 	isBlock && style["button-block"],
			// 	disabled && style["button-disabled"],
			// 	className,
			// )}
			disabled={disabled}
			{...props}
		/>
	);
};

Button.propTypes = {
	Tag: oneOfType([oneOf(["a", "button"]), elementType]),
	type: oneOf(["button", "submit", "reset"]),
	styleType: oneOf(["primary", "secondary", "link", "reset"]),
	isOutline: bool,
	disabled: bool,
	className: string,
	forwardRef: forwardRefPropType,
};

const ButtonLink = (props) => <Button Tag="a" {...props} />;

Button.Link = ButtonLink;

export default pureFC(Button);
