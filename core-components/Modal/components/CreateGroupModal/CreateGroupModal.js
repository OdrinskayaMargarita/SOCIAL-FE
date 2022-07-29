import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import { closeModal } from "store/reducers/app.reducer";
import { getCountries, createGroup } from "store/thunks/group.thunks";
import { groupTypes } from "store/constants/groups.constants";

const CreateGroupModal = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const router = useRouter();
	const countries = useSelector((state) => state.group.countries);
	const { translation } = useSelector((state) => state.app);

	const {
		register,
		handleSubmit,
		formState: { isValid },
		reset,
		control,
	} = useForm({
		mode: "onChange",
		defaultValues: {
			country: 1,
		},
	});
	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	const onCloseModal = () => dispatch(closeModal());

	const onSubmitHandler = useCallback(
		async (formData) => {
			const dataToSend = {
				...formData,
				type: formData.type ? groupTypes.PRIVATE : groupTypes.PUBLIC,
			};
			try {
				const {
					payload: { success, error, data },
				} = await dispatch(createGroup(dataToSend));
				if (success) {
					router.push({ pathname: `/social/groups/${data.id}`, search: "?firstEdit=true" });
					dispatch(closeModal());
				}
			} catch (error) {
				console.error(error);
			}
		},
		[dispatch],
	);

	useEffect(() => {
		reset({
			country: countries?.[0]?.value,
		});
	}, [countries]);
	return (
		<Box
			component="form"
			width={["auto", 410]}
			p={[2.5, 3]}
			onSubmit={handleSubmit(onSubmitHandler)}
		>
			<Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
				<Typography variant="h2">{translation?.["create_group_form.title"]}</Typography>
				<IconButton onClick={onCloseModal} size="large">
					<CloseIcon />
				</IconButton>
			</Box>
			<Stack spacing={2}>
				<Box>
					<FormControlLabel
						label={translation?.["group.edit.requests_to_join"]}
						control={<Switch variant="greenProfile" {...register("type")} />}
					/>
				</Box>
				<TextField
					placeholder={translation?.["create_group_form.group_name_hint"]}
					{...register("name", { required: true, minLength: 3 })}
				/>
				<TextField
					placeholder={translation?.["create_group_form.group_description_hint"]}
					multiline
					rows={4}
					{...register("description")}
				/>
				<Controller
					name="country"
					control={control}
					rules={{ required: "Country required" }}
					render={({ field: { ref, ...field }, fieldState }) => {
						return (
							<TextField
								{...field}
								inputRef={ref}
								select
								placeholder={translation?.["editProfile.additionalSection.country"]}
								error={!!fieldState.error?.message}
							>
								{countries.map((option) => (
									<MenuItem value={option.value} key={option.value}>
										{translation?.[`country.${option.text.toLowerCase()}`]}
									</MenuItem>
								))}
							</TextField>
						);
					}}
				/>
				<TextField
					placeholder={translation?.["create_group_form.select_city_group_hint"]}
					{...register("city")}
				/>
				<Button type="submit" disabled={!isValid}>
					{translation?.["create_group_form.create_group_button"]}
				</Button>
			</Stack>
		</Box>
	);
};

export default CreateGroupModal;
