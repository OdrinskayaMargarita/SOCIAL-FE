import React, { useEffect } from "react";
import { DATA_PRIVACY_TYPES } from "store/constants/profile.constants";
import { InputBase, Select, Switch, FormControlLabel } from "@mui/material";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker, LocalizationProvider } from "@mui/lab";
// import { DatePicker } from "@material-ui/pickers";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { getCountries } from "../../../../store/thunks/group.thunks";

const ContainerInput = styled.div`
	margin-bottom: 25px;
	h3 {
		margin-bottom: 8px;
		font-size: 14px;
		line-height: 20px;
		font-weight: 400;
		color: #748893;
		span {
			color: red;
		}
	}
`;

const ContainerInputsMain = styled.div`
	padding: 25px 20px;
	border-bottom: 1px solid rgba(109, 144, 155, 0.2);
	border-top: 1px solid rgba(109, 144, 155, 0.2);
	h2 {
		margin-bottom: 25px;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
	}
`;

const ContainerInputsAdd = styled.div`
	padding: 25px 20px 0;
	h2 {
		margin-bottom: 25px;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
	}
`;

const ContainerShowInfo = styled.div`
	text-align: right;
`;

const StyledDivDate = styled.div`
	.Mui-error {
		.MuiOutlinedInput-notchedOutline {
			border: none;
		}
	}
`;

const InfoEditor = ({
	user,
	register,
	setValue,
	errors,
	handleBirthDate,
	birthDate,
	countryState,
	handleCountry,
}) => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const countries = useSelector((state) => state?.group?.countries);

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	return (
		<div>
			<ContainerInputsMain>
				<Typography variant="h2">{translation?.["editProfile.generalSection.title"]}</Typography>
				<ContainerInput>
					<Typography variant="h3">
						{translation?.["editProfile.generalSection.name"]}{" "}
						<Typography display="inline" color="primary.error">
							*
						</Typography>
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} md={5}>
							<InputBase
								size="small"
								type="text"
								placeholder={translation?.["editProfile.generalSection.name"]}
								required
								fullWidth
								{...register("firstname")}
							/>
						</Grid>
					</Grid>
					{errors && errors.firstname && errors.firstname.ref && (
						<Typography ml={0.5} mt={0.5} color="primary.error">
							{errors.firstname.message}
						</Typography>
					)}
				</ContainerInput>
				<ContainerInput>
					<Typography variant="h3">
						{translation?.["editProfile.generalSection.surname"]} <span>*</span>
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} md={5}>
							<InputBase
								size="small"
								type="text"
								placeholder={translation?.["editProfile.generalSection.surname"]}
								required
								fullWidth
								{...register("lastname")}
							/>
						</Grid>
					</Grid>
					{errors && errors.lastname && errors.lastname.ref && (
						<Typography ml={0.5} mt={0.5} color="primary.error">
							{errors.lastname.message}
						</Typography>
					)}
				</ContainerInput>
				<ContainerInput>
					<Typography variant="h3">
						{translation?.["editProfile.generalSection.patronymic"]}
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} md={5}>
							<InputBase
								size="small"
								type="text"
								placeholder={translation?.["editProfile.generalSection.patronymic"]}
								fullWidth
								{...register("patronymic")}
							/>
						</Grid>
						<Grid item xs={12} md={5}>
							<Typography color="primary.lightblue">
								{translation?.["editProfile.generalSection.patronymicPlaceholderHint"]}
							</Typography>
						</Grid>
					</Grid>
				</ContainerInput>
				<ContainerInput>
					<Typography variant="h3">{translation?.["editProfile.generalSection.about"]}</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} md={5}>
							<InputBase multiline fullWidth rows={4} {...register("about")} />
						</Grid>
					</Grid>
				</ContainerInput>
			</ContainerInputsMain>

			<ContainerInputsAdd>
				<Typography variant="h2">{translation?.["editProfile.additionalSection.title"]}</Typography>
				<ContainerInput>
					<Typography variant="h3">{translation?.["myProfile.tabs.contacts.location"]}</Typography>
					<Grid container spacing={[1.5, 3]}>
						<Grid item xs={12} md={5}>
							<Select
								fullWidth
								value={countryState?.name || ""}
								onChange={handleCountry}
								placeholder={translation?.["editProfile.additionalSection.country"]}
							>
								{countries.map((option, index) => (
									<MenuItem value={option.text} key={index}>
										{option.text}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} md={5}>
							<InputBase
								size="small"
								type="text"
								placeholder={translation?.["editProfile.additionalSection.city"]}
								fullWidth
								{...register("city")}
							/>
						</Grid>
					</Grid>
				</ContainerInput>
				<ContainerInput>
					<Typography variant="h3">
						{translation?.["editProfile.additionalSection.phone"]} <span>*</span>
					</Typography>
					<Grid container spacing={[0, 3]}>
						<Grid item xs={12} md={5}>
							<InputBase
								size="small"
								type="text"
								placeholder={translation?.["editProfile.additionalSection.phone"]}
								required
								fullWidth
								{...register("phoneNumber")}
							/>
						</Grid>
						<Grid item xs={12} md={5} textAlign={["left", "right"]}>
							<FormControlLabel
								labelPlacement="start"
								sx={{ ml: 0 }}
								label={translation?.["editProfile.showInProfile"]}
								control={
									<Switch
										variant="greenProfile"
										id="phonePrivacyType"
										defaultChecked={user?.phonePrivacyType === DATA_PRIVACY_TYPES.PUBLIC}
										onChange={(event, data) =>
											setValue(
												"phonePrivacyType",
												data ? DATA_PRIVACY_TYPES.PUBLIC : DATA_PRIVACY_TYPES.HIDDEN,
											)
										}
									/>
								}
							/>
						</Grid>
					</Grid>
					{errors && errors.phoneNumber && errors.phoneNumber.ref && (
						<Typography ml={0.5} mt={0.5} color="primary.error">
							{errors.phoneNumber.message}
						</Typography>
					)}
				</ContainerInput>
				<ContainerInput>
					<Typography variant="h3">
						{translation?.["editProfile.additionalSection.email"]} <span>*</span>
					</Typography>
					<Grid container spacing={[0, 3]}>
						<Grid item xs={12} md={5}>
							<InputBase
								size="small"
								type="email"
								placeholder={translation?.["editProfile.additionalSection.email"]}
								required
								fullWidth
								{...register("email")}
							/>
						</Grid>
						<Grid item xs={12} md={5} textAlign={["left", "right"]}>
							<FormControlLabel
								sx={{ ml: 0 }}
								labelPlacement="start"
								label={translation?.["editProfile.showInProfile"]}
								control={
									<Switch
										variant="greenProfile"
										id="emailPrivacyType"
										defaultChecked={user?.emailPrivacyType === DATA_PRIVACY_TYPES.PUBLIC}
										onChange={(event, data) =>
											setValue(
												"emailPrivacyType",
												data ? DATA_PRIVACY_TYPES.PUBLIC : DATA_PRIVACY_TYPES.HIDDEN,
											)
										}
									/>
								}
							/>
						</Grid>
					</Grid>
					{errors && errors.email && errors.email.ref && (
						<Typography ml={0.5} mt={0.5} color="primary.error">
							{errors.email.message}
						</Typography>
					)}
				</ContainerInput>
				<ContainerInput>
					<Typography variant="h3">
						{translation?.["editProfile.additionalSection.birthday"]}
					</Typography>
					<Grid container spacing={[0, 3]}>
						<Grid item xs={12} md={5}>
							<StyledDivDate>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										value={birthDate || ""}
										onChange={handleBirthDate}
										maxDate={new Date()}
										renderInput={(params) => (
											<TextField
												{...params}
												value={moment(birthDate).format("DD.MM.YYYY") || ""}
												fullWidth
												inputProps={{ readOnly: true }}
											/>
										)}
									/>
								</LocalizationProvider>
							</StyledDivDate>
						</Grid>
						<Grid item xs={12} md={5} textAlign={["left", "right"]}>
							<FormControlLabel
								sx={{ ml: 0 }}
								labelPlacement="start"
								label={translation?.["editProfile.showInProfile"]}
								control={
									<Switch
										variant="greenProfile"
										id="birthdayPrivacyType"
										defaultChecked={user?.birthdayPrivacyType === DATA_PRIVACY_TYPES.PUBLIC}
										onChange={(event, data) =>
											setValue(
												"birthdayPrivacyType",
												data ? DATA_PRIVACY_TYPES.PUBLIC : DATA_PRIVACY_TYPES.HIDDEN,
											)
										}
									/>
								}
							/>
						</Grid>
					</Grid>
				</ContainerInput>
			</ContainerInputsAdd>
		</div>
	);
};

export default InfoEditor;
