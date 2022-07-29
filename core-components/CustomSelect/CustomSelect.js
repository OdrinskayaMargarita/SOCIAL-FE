import React from "react";
import { useController } from "react-hook-form";
import TextField from "@mui/material/TextField";

const CustomSelect = ({
	name,
	required = false,
	control,
	defaultValue = "",
	placeholder,
	children,
	textFieldOptions,
}) => {
	const {
		field: { onChange, name: selectName, value: selectValue },
	} = useController({
		name,
		rules: { required },
		defaultValue,
		control,
	});

	return (
		<TextField
			name={selectName}
			value={selectValue}
			onChange={onChange}
			select
			fullWidth
			placeholder={placeholder}
			{...textFieldOptions}
		>
			{children}
		</TextField>
	);
};

export default CustomSelect;
