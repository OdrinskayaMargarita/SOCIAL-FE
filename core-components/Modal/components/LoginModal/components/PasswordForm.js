import React from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";

import { openModal } from "store/reducers/app.reducer";
import { MODAL_TYPES } from "core-components/Modal/constants";

const PasswordForm = ({ handleSubmit, register, errors }) => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	return (
		<Box component="form" onSubmit={handleSubmit}>
			<FormControl fullWidth variant="standard">
				{(errors?.password?.message || errors?.server?.message) && (
					<Alert severity="error" sx={{ my: 1, fontSize: "13px" }}>
						{errors?.password?.message ?? errors?.server?.message}
					</Alert>
				)}
				<InputBase
					name="password"
					placeholder={translation?.["sign_in_form.password_hint"]}
					type="password"
					required
					fullWidth
					sx={{ mb: "10px" }}
					{...register("password")}
				/>
			</FormControl>

			<Box mb={5}>
				<Button
					variant="subaction-button"
					onClick={() => dispatch(openModal(MODAL_TYPES.FORGOT_PASS_MODAL))}
				>
					{translation?.["sign_in_form.forgot_password_button"]}
				</Button>
			</Box>
			<Button fullWidth type="submit" variant="fat">
				{translation?.["sign_in_form.sign_in_button"]}
			</Button>
		</Box>
	);
};

export default PasswordForm;
