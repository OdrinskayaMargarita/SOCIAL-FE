import React, { useState, useCallback, useEffect, useMemo } from "react";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import styled from "@emotion/styled";

import { createSolution, getSolutionData, updateSolution } from "store/thunks/solutions.thunks";
import { getGroupsByUser } from "store/thunks/group.thunks";
import { SmartLayout, SmartNavigation, SectionItem, Button, FieldInput } from "components";
import NextLink from "components/common/NextLink";

const ContainerInput = styled.div`
	margin-bottom: 20px;
	width: 100%;
	label {
		display: block;
		margin-bottom: 5px;
		color: #748893;
		span {
			color: red;
		}
	}
	.MuiInputBase-root {
		margin-bottom: 10px;
		background: #fff;
		padding: 10px;
		input {
			padding: 0;
		}
	}
	select {
		border-radius: 12px;
		border-color: rgba(109, 144, 155, 0.1);
		padding: 10px;
	}
`;

const Update = () => {
	const {
		register,
		handleSubmit,
		formState: { isValid },
		setValue,
	} = useForm({
		mode: "onChange",
	});
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [startVoting, setStartVoting] = useState(new Date());
	const [endVoting, setEndVoting] = useState(new Date());
	const [solutions, setSolutions] = useState([]);

	const user = useSelector((state) => state.auth.user);
	const userGroups = useSelector((state) => state.group.userGroups);
	const solution = useSelector((state) => state.solutions.data.itself);
	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		solution?.content?.name && setValue("title", solution.content?.name);
		// eslint-disable-next-line no-unused-expressions
		solution?.content?.description && setValue("description", solution.content?.description);
		// eslint-disable-next-line no-unused-expressions
		solution?.content?.startTimestamp && setStartVoting(new Date(solution.content?.startTimestamp));
		// eslint-disable-next-line no-unused-expressions
		solution?.content?.endTimestamp && setEndVoting(new Date(solution.content?.endTimestamp));
	}, [solution]);
	const router = useRouter();

	const onSubmitHandler = useCallback(
		async (formData) => {
			try {
				const {
					payload: { success, data },
				} = await dispatch(
					updateSolution({
						title: formData.title,
						description: formData.description,
						id: router.query.id,
					}),
				);
				if (success) {
					router.replace(`../../solutions/${router.query.id}`);
				}
			} catch (e) {
				console.error(e);
			}
		},
		[dispatch, startVoting, endVoting, solutions],
	);

	useEffect(() => {
		if (router.query.id !== undefined) {
			dispatch(getSolutionData(router.query.id));
		}
	}, [dispatch, router.query.id]);

	useEffect(() => {
		dispatch(getGroupsByUser(user.id));
	}, [dispatch]);

	useEffect(() => {
		if (userGroups?.length) setValue("id", userGroups[0]?.id);
	}, [userGroups]);

	return (
		<SmartLayout>
			<Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
				<Head>
					<title>Создать решение</title>
				</Head>
				<SectionItem>
					<Grid container justifyContent="space-between">
						<Grid item xs={6}>
							<Typography variant="h1">Редактировать решение</Typography>
						</Grid>
						<Grid item xs={4}>
							<Grid container justifyContent="space-between">
								<Grid item>
									<NextLink href={`/social/solutions/${router.query.id}`}>
										<Button variant="white">{t("articles.create.cancel")}</Button>
									</NextLink>
								</Grid>
								<Grid item>
									<Button variant="contained" type="submit">
										{t("articles.create.save")}
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</SectionItem>
				<SectionItem>
					<ContainerInput>
						<label htmlFor="title">Тема голосования</label>
						<InputBase
							control="title"
							fullWidth
							variant="white-input"
							placeholder="Введите текст..."
							{...register("title", { required: true })}
						/>
					</ContainerInput>
					<ContainerInput>
						<label htmlFor="title">Описание</label>
						<InputBase
							multiline
							fullWidth
							rows={4}
							variant="white-input"
							placeholder={t("feed.createPost.placeholder")}
							{...register("description", { required: true })}
						/>
					</ContainerInput>
					<Grid container col={12} spacing={4} justifyContent="space-between">
						<Grid item xs={6}>
							<ContainerInput>
								<label htmlFor="title">Время начала голосования</label>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DateTimePicker
										value={startVoting}
										renderInput={(params) => <TextField fullWidth {...params} />}
										disabled
									/>
								</LocalizationProvider>
							</ContainerInput>
						</Grid>
						<Grid item xs={6}>
							<ContainerInput>
								<label htmlFor="title">Время конца голосования</label>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DateTimePicker
										renderInput={(params) => <TextField fullWidth {...params} />}
										value={endVoting}
										disabled
									/>
								</LocalizationProvider>
							</ContainerInput>
						</Grid>
					</Grid>
				</SectionItem>
			</Box>
		</SmartLayout>
	);
};

export default Update;
