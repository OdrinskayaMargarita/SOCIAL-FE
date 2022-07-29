import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

import { createSolution } from "store/thunks/solutions.thunks";
import { getGroupsByUser } from "store/thunks/group.thunks";
import { SmartLayout, SectionItem } from "components";
import NextLink from "components/common/NextLink";
import CustomSelect from "core-components/CustomSelect/CustomSelect";
import { groupsMembersRole } from "../../store/constants/groups.constants";

const Create = () => {
	const { translation } = useSelector((state) => state.app);
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.auth.user);
	const userGroups = useSelector((state) => state.group.userGroups);
	const router = useRouter();

	const [startVoting, setStartVoting] = useState(new Date());
	const [endVoting, setEndVoting] = useState(new Date());
	const [solutions, setSolutions] = useState([]);

	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
		setError,
		setValue,
		control,
	} = useForm({
		mode: "onChange",
	});

	const isFormValid = useMemo(() => {
		if (!solutions?.length || solutions.every((el) => !el?.length)) {
			return false;
		}
		return isValid;
	}, [solutions, isValid, setSolutions]);

	const addEmptySolution = () => {
		setSolutions((current) =>
			current[current?.length - 1]?.length || !current?.length ? [...current, ""] : [...current],
		);
	};

	const addByEnter = (event) => {
		if (event.key === "Enter") {
			addEmptySolution();
			const { maxLength, value, name } = event.target;
			const [fieldName, fieldIndex] = name.split("-");

			const fieldIntIndex = parseInt(fieldIndex, 10);

			// Check if no of char in field == maxlength
			if (value.length >= maxLength) {
				// It should not be last input field
				if (fieldIntIndex < 3) {
					// Get the next input field using it's name
					const nextfield = document.querySelector(`input[name=field-${fieldIntIndex + 1}]`);

					// If found, focus the next field
					if (nextfield !== null) {
						nextfield.focus();
					}
				}
			}
		}
	};

	const onSubmitHandler = useCallback(
		async (event, formData) => {
			event?.preventDefault();
			try {
				const {
					payload: { success, error, data },
				} = await dispatch(
					createSolution({
						...formData,
						startVoting,
						endVoting,
						solutions: [...solutions.filter((solution) => solution?.length)],
					}),
				);
				if (success) {
					router.replace(`../../social/solutions/${data.id}`);
				} else {
					setError("solution", { type: "manual", message: error.message });
				}
			} catch (e) {
				console.error(e);
			}
		},
		[dispatch, startVoting, endVoting, solutions, setError],
	);

	const handleStartDateChange = (value) => {
		setStartVoting(value);
	};

	const handleEndDateChange = (value) => {
		setEndVoting(value);
	};

	const changeInputValue = (idx, event) => {
		const inputArray = [...solutions];
		inputArray[idx] = event.target.value;
		setSolutions(inputArray);
	};

	useEffect(() => {
		dispatch(getGroupsByUser(user.id));
	}, [dispatch]);

	useEffect(() => {
		if (userGroups?.length) setValue("id", userGroups[0]?.id);
	}, [userGroups]);

	return (
		<SmartLayout>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<SectionItem>
					<Grid container justifyContent="space-between">
						<Grid item xs={6}>
							<Typography variant="h2">{translation?.["solutions.create.header"]}</Typography>
						</Grid>
						<Grid item xs={4}>
							<Grid container justifyContent="flex-end" spacing={2}>
								<Grid item>
									<NextLink href="/social/solutions">
										<Button variant="white">{translation?.["solutions.cancel"]}</Button>
									</NextLink>
								</Grid>
								<Grid item>
									<Button type="submit" variant="contained" disabled={!isFormValid}>
										{translation?.["solutions.edit.save"]}
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</SectionItem>

				<SectionItem>
					{errors.solution && (
						<Box mt={2}>
							<Alert severity="error">{errors.solution.message}</Alert>
						</Box>
					)}
					<Box mt={2.5}>
						<InputLabel htmlFor="title" required>
							{translation?.["solutions.create.theme"]}
						</InputLabel>
						<InputBase
							control="title"
							fullWidth
							placeholder={translation?.["createPost.enterTextPlaceholder"]}
							{...register("title", { required: true })}
						/>
					</Box>
					<Box mt={2.5}>
						<InputLabel htmlFor="title" required>
							{translation?.["solutions.create.description"]}
						</InputLabel>
						<InputBase
							multiline
							fullWidth
							rows={4}
							placeholder={translation?.["createPost.enterTextPlaceholder"]}
							{...register("description", { required: true })}
						/>
					</Box>
					<Box mt={2.5}>
						<InputLabel htmlFor="title" required>
							{translation?.["solutions.header"]}
						</InputLabel>
						{solutions.map((solution, idx) => (
							<Box key={idx} mt={2.5}>
								<InputBase
									fullWidth
									autoFocus
									onChange={(event) => changeInputValue(idx, event)}
									placeholder={`${translation?.["solutions.create.solution"]} ${idx + 1}`}
									onKeyDown={addByEnter}
									value={solution}
									endAdornment={
										<InputAdornment position="end">
											<ClearIcon
												color="error"
												cursor="pointer"
												onClick={() =>
													setSolutions(solutions.filter((item, index) => index !== idx))
												}
											/>
										</InputAdornment>
									}
								/>
							</Box>
						))}
						<Box mt={2.5}>
							{solutions?.length < 30 ? (
								<Button onClick={addEmptySolution} fullWidth>
									{translation?.["solution_offering_solutions.add_solution_hint"]}
								</Button>
							) : null}
						</Box>
					</Box>

					<Grid container col={12} spacing={4} justifyContent="space-between">
						<Grid item xs={6}>
							<Box mt={2.5}>
								<InputLabel htmlFor="title" required>
									{translation?.["solutions.create.voting_start"]}
								</InputLabel>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										value={startVoting}
										onChange={handleStartDateChange}
										minDate={new Date()}
										renderInput={(params) => <TextField fullWidth {...params} />}
									/>
								</LocalizationProvider>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box mt={2.5}>
								<InputLabel htmlFor="title" required>
									{translation?.["solutions.create.votind_end"]}
								</InputLabel>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										value={endVoting}
										onChange={handleEndDateChange}
										minDate={new Date()}
										renderInput={(params) => <TextField fullWidth {...params} />}
									/>
								</LocalizationProvider>
							</Box>
						</Grid>
					</Grid>
					<Box mt={2.5}>
						<InputLabel htmlFor="title" required>
							{translation?.["solutions.create.publish"]}
						</InputLabel>
						<CustomSelect
							name="id"
							required
							control={control}
							placeholder={translation?.["createPost.enterTextPlaceholder"]}
						>
							{userGroups.map((option, idx) => {
								let canPost = false;
								if (!option.current_user_role) {
									canPost = true;
								}
								if (
									option?.current_user_role === groupsMembersRole.ADMINISTRATOR ||
									option?.current_user_role === groupsMembersRole.OWNER ||
									option?.current_user_role === groupsMembersRole.MODERATOR
								) {
									canPost = true;
								}
								return (
									option.is_followed &&
									canPost && (
										<MenuItem value={option.id} key={idx}>
											{option.key ? t(option.key) : option.name}
										</MenuItem>
									)
								);
							})}
						</CustomSelect>
					</Box>
				</SectionItem>
			</form>
		</SmartLayout>
	);
};

export default Create;
