import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SecureCodeInput from "core-components/SecureCodeInput/SecureCodeInput";
import { useSelector } from "react-redux";

const SecureCodeForm = ({ resendCode, onConfirm }) => {
	const { translation } = useSelector((state) => state.app);
	const [secureCode, setSecureCode] = useState("");

	const handleConfirm = (e) => {
		e.preventDefault();
		onConfirm(secureCode);
	};

	return (
		<Box component="form" onSubmit={handleConfirm}>
			<SecureCodeInput onSubmit={(code) => setSecureCode(code)} />
			<Box sx={{ mb: 4, mt: 3, display: "flex", alignItems: "center" }}>
				<Typography mr={1}>{translation?.["enter_the_code_form.hint"]}</Typography>
				<Button variant="subaction-button" onClick={resendCode}>
					{translation?.["become_a_member_form4.send_once_again_button"]}
				</Button>
			</Box>
			<Button fullWidth type="submit" disabled={!secureCode.length} variant="fat">
				{translation?.["enter_the_code_form.submit_button"]}
			</Button>
		</Box>
	);
};

export default SecureCodeForm;
