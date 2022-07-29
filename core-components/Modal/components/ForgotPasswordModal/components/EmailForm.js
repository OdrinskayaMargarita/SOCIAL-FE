import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Translate from "core-components/Translate/Translate";
import { useSelector } from "react-redux";

const EmailForm = ({ register, handleContinue, errors }) => {
	const { translation } = useSelector((state) => state.app);
	const [stateEmailForm, setStateEmailForm] = useState("");

	const handleEnterInput = (e) => {
		setStateEmailForm(e.target.value);
	};

	const handleNext = (e) => {
		e.preventDefault();
		handleContinue();
	};
	return (
		<Box component="form" onSubmit={handleNext}>
			{errors?.email?.message && (
				<Alert severity="error" sx={{ my: 1, fontSize: "13px" }}>
					<Translate string={errors.email.message} />
				</Alert>
			)}
			<TextField
				fullWidth
				type="email"
				placeholder="Email"
				required
				sx={{ mb: 2 }}
				{...register("email")}
				onChange={(e) => handleEnterInput(e)}
			/>
			<Button fullWidth type="submit" variant="fat" disabled={!stateEmailForm?.length}>
				{translation?.["set_new_password_form.confirm_button"]}
			</Button>
		</Box>
	);
};

export default EmailForm;
