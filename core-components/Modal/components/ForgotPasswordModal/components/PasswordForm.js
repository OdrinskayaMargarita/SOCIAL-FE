import React from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Translate from "core-components/Translate/Translate";
import { useSelector } from "react-redux";

const PasswordForm = ({ register, errors, handleSubmit }) => {
	const { translation } = useSelector((state) => state.app);

	return (
		<Stack component="form" onSubmit={handleSubmit} spacing={2} noValidate autoComplete="off">
			<TextField
				name="password"
				placeholder={translation?.["sign_in_form.password_hint"]}
				type="password"
				required
				fullWidth
				{...register("password")}
			/>
			{errors && errors.password && errors.password.ref && (
				<Alert my={0.5} severity="error">
					<Translate string={errors.password.message} />
				</Alert>
			)}
			<TextField
				name="repeatPassword"
				placeholder={translation?.["create_account_form.repeat_password_hint"]}
				type="password"
				required
				fullWidth
				{...register("repeatPassword")}
			/>
			{errors && errors.repeatPassword && errors.repeatPassword.ref && (
				<Alert my={0.5} severity="error">
					<Translate string={errors.repeatPassword.message} />
				</Alert>
			)}
			<Button fullWidth type="submit" variant="fat">
				{translation?.["reset_password_form.continue_button"]}
			</Button>
		</Stack>
	);
};

export default PasswordForm;
