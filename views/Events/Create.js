import React, { useState, useCallback, useEffect } from "react";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { SmartLayout, SectionItem } from "components";
import { eventHTMLFormats, eventHTMLModules } from "store/constants/app.constants";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { getGroupsByUser } from "store/thunks/group.thunks";
import HTMLEditor from "components/HTMLEditor";
import { createEvent } from "store/thunks/events.thunks";
import { UploadBackground } from "core-components/CreateSocial/UploadTitle";
import { GalleryInput } from "core-components/GalleryInput/GalleryInput";
import { Box, Grid, InputLabel, Button, InputBase, Typography } from "@mui/material";
import CustomSelect from "core-components/CustomSelect/CustomSelect";
import { groupsMembersRole } from "../../store/constants/groups.constants";

const Create = () => {
	const { t } = useTranslation();
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	const user = useSelector((state) => state.auth.user);
	const userGroups = useSelector((state) => state.group.userGroupsWithFeed);
	const router = useRouter();

	const [files, setFiles] = useState([]);
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());

	const {
		register,
		handleSubmit,
		formState: { isValid },
		setValue,
		control,
	} = useForm({
		mode: "onChange",
	});

	const onSubmitHandler = useCallback(
		async (formData) => {
			try {
				const {
					payload: { success, data },
				} = await dispatch(createEvent({ ...formData, files, startTime, endTime }));

				if (success) {
					router.replace(`../../social/events/${data.id}`);
				}
			} catch (e) {
				console.error(e);
			}
		},
		[dispatch, files, startTime, endTime],
	);

	const onChangeContentHandler = useCallback(
		(value) => {
			setValue("content", value);
		},
		[setValue],
	);

	const handleStartDateChange = useCallback(
		(value) => {
			setStartTime(value);
		},
		[setStartTime],
	);

	const handleEndDateChange = useCallback(
		(value) => {
			setEndTime(value);
		},
		[setEndTime],
	);

	useEffect(() => {
		dispatch(getGroupsByUser(user.id));
	}, [dispatch]);

	useEffect(() => {
		if (userGroups?.length) setValue("id", userGroups[0]?.id);
	}, [userGroups]);
	return (
		<SmartLayout>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<Head>
					<title>{translation?.["event.create.header"]}</title>
				</Head>
				<SectionItem>
					<Grid container alignItems="center" justifyContent="space-between">
						<Grid item>
							<Typography variant="h2">{translation?.["event.create.header"]}</Typography>
						</Grid>
						<Box>
							<Button
								sx={{
									marginRight: "20px",
								}}
								variant="white"
								type="button"
								onClick={() => router.push("/social/events")}
							>
								{translation?.["event.cancel"]}
							</Button>
							<Button type="submit" variant="contained" disabled={!isValid}>
								{translation?.["event.save"]}
							</Button>
						</Box>
					</Grid>
				</SectionItem>
				<SectionItem>
					<UploadBackground {...{ setValue }} />
					<Box mt={2.5}>
						<InputLabel htmlFor="title" required>
							{translation?.["event.title"]}
						</InputLabel>
						<InputBase
							fullWidth
							control="title"
							placeholder={translation?.["event.title"]}
							{...register("title", { required: true })}
						/>
					</Box>
					<Box mt={2.5}>
						<Grid container justifyContent="space-between">
							<Grid item>
								<InputLabel htmlFor="title" required>
									{translation?.["event.date.begining"]}
								</InputLabel>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DateTimePicker
										value={startTime}
										onChange={handleStartDateChange}
										minDate={new Date()}
										renderInput={(params) => <TextField {...params} />}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid item>
								<InputLabel htmlFor="title">{translation?.["event.date.ending"]}</InputLabel>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DateTimePicker
										value={endTime}
										onChange={handleEndDateChange}
										minDate={new Date()}
										renderInput={(params) => <TextField {...params} />}
									/>
								</LocalizationProvider>
							</Grid>
						</Grid>
					</Box>
					<Box mt={2.5}>
						<InputLabel htmlFor="address" required>
							{translation?.["event.place"]}
						</InputLabel>
						<InputBase
							fullWidth
							control="address"
							placeholder={translation?.["event.place"]}
							{...register("address", { required: true })}
						/>
					</Box>
					<Box mt={2.5}>
						<InputLabel htmlFor="title">{translation?.["event.description"]}</InputLabel>
						<HTMLEditor
							onChange={onChangeContentHandler}
							formats={eventHTMLFormats}
							modules={eventHTMLModules}
						/>
					</Box>
					<Box mt={2.5}>
						<GalleryInput {...{ files, setFiles }} />
					</Box>
					<Box mt={2.5}>
						<InputLabel htmlFor="title" required>
							{translation?.["event.publish"]}
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
