import React, { useEffect } from "react";
import invariant from "invariant";
import { string, oneOf, number, bool, oneOfType, node, func } from "prop-types";
import forwardRefPropType from "../../utils/forward-ref";
import pureFC from "../../utils/pureFC";

const FieldInput = ({
	type = "text",
	hideInputNumberArrows = true,
	maxLength = 250,
	error,
	className,
	forwardRef,
	onKeydown = null,
	inputValue = "",
	onChange = null,
	...props
}) => {
	if (process.env.NODE_ENV !== "production") {
		invariant(!/^(button|reset|submit)$/.test(type), "Use <Button /> component instead of Input");
	}
	return (
		<input
			type={type}
			maxLength={maxLength}
			ref={forwardRef}
			// className={classnames(className, style["field-input"], style[`field-${type}`], {
			// 	[style["hidden-arrows"]]: type === "number" && hideInputNumberArrows,
			// 	[style["field-error"]]: error,
			// })}
			onKeyDown={onKeydown}
			value={inputValue}
			onChange={onChange}
			{...props}
		/>
	);
};

FieldInput.propTypes = {
	type: oneOf([
		"email",
		"file",
		"hidden",
		"number",
		"password",
		"range",
		"search",
		"tel",
		"text",
		"url",
	]),
	className: string,
	maxLength: number,
	error: oneOfType([bool, string, node]),
	hideInputNumberArrows: bool,
	forwardRef: forwardRefPropType,
	onKeydown: func,
	inputValue: string,
};

export default pureFC(FieldInput);
