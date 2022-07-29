import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import validationShema from "views/Profile/form.schema";

import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import AvatarEditor from "./AvatarEditor";
import InfoEditor from "./InfoEditor";

const ProfileEdit = ({
	user,
	changeMode,
	cancel,
	handleBirthDate,
	birthDate,
	countryState,
	handleCountry,
	handleDeleteAvatar,
}) => {
	const { translation } = useSelector((state) => state.app);
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
	} = useForm({
		resolver: yupResolver(validationShema),
		defaultValues: {
			firstname: user.firstname,
			lastname: user.lastname,
			patronymic: user.patronymic,
			about: user.about,
			city: user.city,
			country: user.country,
			email: user.email,
			emailPrivacyType: user.emailPrivacyType,
			phoneNumber: user.phoneNumber,
			phonePrivacyType: user.phonePrivacyType,
			birthdayPrivacyType: user.birthdayPrivacyType,
		},
	});

	return (
		<form autoComplete="off" onSubmit={handleSubmit(changeMode)} noValidate>
			<Box px={[1.5, 2.5]} pt={2}>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item xs={12} md={6}>
						<Typography variant="h2">{translation?.["editProfile.title"]}</Typography>
					</Grid>
					<Grid
						item
						container
						xs={12}
						md={4}
						mt={[1, 0]}
						justifyContent={["flex-start", "flex-end"]}
						spacing={1}
					>
						<Grid item>
							<Button variant="white" onClick={cancel}>
								{translation?.["event.cancel"]}
							</Button>
						</Grid>
						<Grid item>
							<Button variant="contained" type="submit">
								{translation?.["event.save"]}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Box>

			<AvatarEditor user={user} setValue={setValue} handleDeleteAvatar={handleDeleteAvatar} />
			<InfoEditor
				{...{
					user,
					register,
					setValue,
					errors,
					handleBirthDate,
					handleCountry,
					birthDate,
					getValues,
					countryState,
				}}
			/>
		</form>
	);
};

export default ProfileEdit;
