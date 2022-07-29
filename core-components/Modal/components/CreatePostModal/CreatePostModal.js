import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { create } from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";

import { getGroupsByUser } from "store/thunks/group.thunks";
import { createModalUserValue, groupsMembersRole } from "store/constants/groups.constants";
import { createPost, getFeeds } from "store/thunks/feed.thunks";
import { closeModal } from "store/reducers/app.reducer";
import { reset } from "store/reducers/feed.reducer";

import { GalleryInput } from "core-components/GalleryInput/GalleryInput";
import CustomSelect from "core-components/CustomSelect/CustomSelect";

const canPostToGroup = (group) =>
	group.is_followed &&
	(!group.current_user_role ||
		[
			groupsMembersRole.ADMINISTRATOR,
			groupsMembersRole.OWNER,
			groupsMembersRole.MODERATOR,
		].includes(group.current_user_role));

const CreatePostModal = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const userGroups = useSelector((state) => state.group.userGroupsWithFeed);

	const {
		register,
		handleSubmit,
		formState: { isValid },
		control,
	} = useForm({
		defaultValues: { id: createModalUserValue.id },
		mode: "onChange",
	});

	const [files, setFiles] = useState([]);

	const [errorMessage, setErrorMessage] = useState(null);

	const onSubmitHandler = useCallback(
		async (formData) => {
			try {
				const {
					payload: { success, error },
				} = await dispatch(
					createPost({
						text: formData.text,
						id_group: formData.id !== createModalUserValue.id ? +formData.id : null,
						is_publish_in_my_feed: formData.id === createModalUserValue.id,
						images: files.map(({ content, filename }) => {
							return { content: content.split(",")[1], filename };
						}),
					}),
				);

				if (error) setErrorMessage(error.message);
				if (success) {
					await dispatch(closeModal());
					await dispatch(reset());
					await dispatch(getFeeds());
				}
			} catch (e) {
				console.error(e);
			}
		},
		[dispatch, create, setErrorMessage, files],
	);

	useEffect(() => {
		dispatch(getGroupsByUser({ userId: user.id }));
	}, [dispatch]);

	const onCloseModal = () => {
		dispatch(closeModal());
	};

	return (
		<Box
			component="form"
			width={["auto", 410]}
			p={[2.5, 3]}
			onSubmit={handleSubmit(onSubmitHandler)}
		>
			<Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
				<Typography variant="h2">{t("feed.createPost.header")}</Typography>
				<IconButton onClick={onCloseModal} size="large">
					<CloseIcon />
				</IconButton>
			</Box>
			<Stack spacing={2}>
				<TextField
					multiline
					fullWidth
					mb={2}
					rows={4}
					placeholder={t("feed.createPost.placeholder")}
					{...register("text", { required: true })}
				/>
				<GalleryInput mb={2} {...{ files, setFiles }} />
				<CustomSelect
					name="id"
					required
					control={control}
					placeholder={t("group.createModal.placeholders.country")}
					textFieldOptions={{
						fullWidth: true,
						mb: 2,
						label: `${t("feed.createPost.label")} *`,
					}}
					defaultValue={userGroups[0]?.id}
				>
					{userGroups.filter(canPostToGroup).map((option) => (
						<MenuItem value={option.id} key={option.id}>
							{option.key ? t(option.key) : option.name}
						</MenuItem>
					))}
				</CustomSelect>
				{errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
				<Button fullWidth type="submit" disabled={!isValid}>
					{t("feed.createPost.button")}
				</Button>
			</Stack>
		</Box>
	);
};

export default CreatePostModal;
