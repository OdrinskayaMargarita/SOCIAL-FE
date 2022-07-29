import React, { useState } from "react";

import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";

const SecureCodeInput = ({ count = 6, onSubmit }) => {
	const [secureCode, setSecureCode] = useState("");

	const handleInputItemChange = (e) => {
		const { form } = e.target;
		const inputIndex = [...form].indexOf(e.target);

		if (e.code === "Backspace") {
			setSecureCode(secureCode.slice(0, -1));
			form.elements[inputIndex - 1]?.focus();
		} else if (e.code.startsWith("Digit")) {
			const character = e.key;
			const value =
				secureCode.substring(0, inputIndex) + character + secureCode.substring(inputIndex + 1);
			setSecureCode(value);
			form.elements[inputIndex + 1]?.focus();
			if (value.length === count) {
				onSubmit(value);
			}
		}
	};

	return (
		<Stack component="form" direction="row" spacing={1}>
			{Array(count)
				.fill(0)
				.map((_, i) => (
					<InputBase
						key={i}
						type="text"
						variant="secure-code"
						value={secureCode.slice(i, i + 1)}
						onKeyUp={handleInputItemChange}
					/>
				))}
		</Stack>
	);
};
export default SecureCodeInput;
