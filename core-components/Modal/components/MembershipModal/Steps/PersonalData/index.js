import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { some, isEmpty } from "lodash";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { updateProfileData } from "store/thunks/profile.thunks";
import { fetchUserProfile } from "store/thunks/auth.thunks";
import { PHONE_VALIDATION_PATTERN } from "store/constants/validation.constants";

import { ControlsContainer, MembershipContainer } from "../../styled";

export const PersonalData = ({ showNextStep }) => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			firstname: user.firstname,
			lastname: user.lastname,
			phoneNumber: user.phoneNumber,
		},
	});
	const onSubmitHandler = useCallback(
		async (data) => {
			const { firstname, lastname, phoneNumber } = data;
			try {
				const {
					payload: { success, error },
				} = await dispatch(
					updateProfileData({
						firstname,
						lastname,
						phone_number: phoneNumber,
					}),
				);
				if (success) {
					dispatch(fetchUserProfile());
				}
			} catch (error) {
				console.error(error);
			}
			showNextStep();
		},
		[dispatch],
	);
	const isDataEmpty = useMemo(
		() => some([user.firstname, user.lastname, user.phoneNumber], isEmpty),
		[user],
	);

	return (
		<div>
			<Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
				<MembershipContainer>
					<Typography mb={2} variant="h2">
						{translation?.["become_a_member_form2.subtitle"]}
					</Typography>
					<Typography mb={3} color="primary.lightblue">
						{isDataEmpty
							? translation?.["become_a_member_form2.hint"]
							: translation?.["become_a_member_form2.hint"]}
					</Typography>
					<Stack
						component="form"
						sx={{
							width: ["100%", "60%"],
							minHeight: 300,
						}}
						spacing={2}
						noValidate
						autoComplete="off"
					>
						<TextField
							type="text"
							placeholder={translation?.["become_a_member_form2.first_name_hint"]}
							name="firstname"
							{...register("firstname")}
						/>
						<TextField
							type="text"
							placeholder={translation?.["become_a_member_form2.last_name_hint"]}
							name="lastname"
							{...register("lastname")}
						/>
						<TextField
							type="text"
							placeholder={translation?.["become_a_member_form2.phone_number_hint"]}
							name="phonenumber"
							{...register("phoneNumber", {
								required: true,
								pattern: PHONE_VALIDATION_PATTERN,
							})}
						/>
					</Stack>
				</MembershipContainer>
				<ControlsContainer>
					<Button fullWidth disabled={!isValid} type="submit" variant="fat">
						{translation?.["become_a_member_form1.continue_button"]}
					</Button>
				</ControlsContainer>
			</Box>
		</div>
	);
};
