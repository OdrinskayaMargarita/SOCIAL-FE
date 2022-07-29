import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Translate from "core-components/Translate/Translate";

import SecureCodeInput from "core-components/SecureCodeInput/SecureCodeInput";

const SecureCodeForm = ({ resendCode, onConfirm, errors }) => {
	const { translation } = useSelector((state) => state.app);
	const [secureCode, setSecureCode] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onConfirm(secureCode);
	};

	return (
		<Box component="form" onSubmit={handleSubmit}>
			{errors?.firstname?.message && (
				<Alert severity="error">
					<Translate string={errors.firstname.message} />
				</Alert>
			)}
			<SecureCodeInput onSubmit={(code) => setSecureCode(code)} />
			<Typography my={4}>
				{translation?.["enter_the_code_form.hint"]}
				<Button
					type="button"
					variant="subaction-button"
					onClick={resendCode}
					sx={{ textTransform: "none" }}
				>
					{translation?.["enter_the_code_form.send_once_again_button"]}
				</Button>
			</Typography>
			<Button
				fullWidth
				onClick={() => onConfirm(secureCode)}
				disabled={!secureCode.length}
				variant="fat"
			>
				{translation?.["sign_in_form.continue_button"]}
			</Button>
		</Box>
	);
};

export default SecureCodeForm;
