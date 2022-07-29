import React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Translate from "core-components/Translate/Translate";

const UserDataForm = ({ register, errors, handleSubmit }) => {
	const { translation } = useSelector((state) => state.app);
	return (
		<Stack component="form" onSubmit={handleSubmit} spacing={2} noValidate autoComplete="off">
			{errors?.firstname?.message && (
				<Alert severity="error">
					<Translate string={errors.firstname.message} />
				</Alert>
			)}
			<TextField
				name="firstname"
				placeholder={translation?.["create_account_form.name_hint"]}
				{...register("firstname")}
			/>

			{errors?.lastname?.message && (
				<Alert severity="error">
					<Translate string={errors.lastname.message} />
				</Alert>
			)}
			<TextField
				name="lastname"
				placeholder={translation?.["create_account_form.second_name_hint"]}
				{...register("lastname")}
			/>
			{errors?.password?.message && (
				<Alert severity="error">
					<Translate string={errors.password.message} />
				</Alert>
			)}
			<TextField
				name="password"
				placeholder={translation?.["create_account_form.password_is_required_error"]}
				type="password"
				required
				{...register("password")}
			/>
			{errors?.repeatPassword?.message && (
				<Alert severity="error">
					<Translate string={errors.repeatPassword.message} />
				</Alert>
			)}
			<TextField
				name="repeatPassword"
				placeholder={translation?.["create_account_form.repeat_password_hint"]}
				type="password"
				required
				{...register("repeatPassword")}
			/>
			<Button type="submit" variant="fat">
				{translation?.["create_account_form.create_account_button"]}
			</Button>
		</Stack>
	);
};

export default UserDataForm;
