import React, { useCallback, useEffect, useState } from "react";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { SmartLayout, SectionItem } from "components";
import { articleHTMLFormats, articleHTMLModules } from "store/constants/app.constants";
import { getGroupsByUser } from "store/thunks/group.thunks";
import HTMLEditor from "components/HTMLEditor";
import { UploadBackground } from "core-components/CreateSocial/UploadTitle";
import { Loading } from "components/common";
import CustomSelect from "core-components/CustomSelect/CustomSelect";
import { groupsMembersRole, createModalUserValue } from "../../store/constants/groups.constants";
import useArticle from "./hooks/useArticle";

const Create = ({ isEdit }) => {
	const { t } = useTranslation();
	const [isDeleteImage, setIsDeleteImage] = useState(false);
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const { article, updateArticle, createArticle, getArticle } = useArticle();
	const user = useSelector((state) => state.auth.user);
	const userGroups = useSelector((state) => state.group.userGroupsWithFeed);
	const router = useRouter();

	const {
		query: { id: articleId },
	} = router;
	const isEditingArticle = !!articleId && isEdit;
	const {
		register,
		handleSubmit,
		setValue,
		formState: { isValid },
		reset,
		control,
	} = useForm({
		mode: "onChange",
	});
	const onSubmitHandler = useCallback(
		async (formData) => {
			try {
				if (isEditingArticle) {
					const dataToSend = {
						title: formData.title,
						content: formData?.content || "",
						id: article.id,
						ids_group_to_delete: article.postedTo.id === formData.id ? [] : [article.postedTo.id],
						ids_group_to_save:
							article.postedTo.id !== formData.id && formData.id !== createModalUserValue.id
								? [+formData.id]
								: [],
						is_publish_in_my_feed: formData.id === createModalUserValue.id,
						title_image:
							formData?.avatar?.filename === article?.content?.titleImage?.filename
								? null
								: {
										filename: formData?.avatar?.filename,
										content: formData?.avatar?.content,
								  },
						is_delete_title_image: isDeleteImage,
					};
					const {
						payload: { success, data },
					} = await updateArticle(dataToSend);
					if (success) {
						router.push(`/social/articles/${data.id}`);
					}
					return;
				}
				const {
					payload: { success, data },
				} = await createArticle(formData);
				if (success) {
					router.replace(`../../social/articles/${data.id}`);
				}
			} catch (e) {
				console.error(e);
			}
		},
		[dispatch, isDeleteImage, isEditingArticle, article],
	);
	const onChangeContentHandler = useCallback(
		(content) => {
			setValue("content", content);
		},
		[setValue],
	);

	useEffect(() => {
		dispatch(getGroupsByUser(user.id));
	}, [dispatch]);

	useEffect(() => {
		if (userGroups?.length && !isEditingArticle) setValue("id", userGroups[0]?.id);
	}, [userGroups, isEditingArticle]);

	useEffect(() => {
		if (isEditingArticle) {
			getArticle(articleId);
		}
	}, [isEditingArticle]);

	useEffect(() => {
		if (article) {
			reset({
				title: article?.content?.title,
				content: article?.content?.content,
				avatar: {
					filename: article?.content?.titleImage?.filename,
					content: article?.content?.titleImage?.url,
				},
				id: article?.postedTo?.id,
			});
		}
	}, [article]);

	if (isEditingArticle && !article) {
		return <Loading />;
	}
	return (
		<SmartLayout>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<Head>
					<title>{translation?.["article_create.header"]}</title>
				</Head>
				<SectionItem>
					<Grid container alignItems="center" justifyContent="space-between">
						<Grid item>
							<Typography variant="h2">
								{translation?.[isEditingArticle ? "article.edit.title" : "article_create.header"]}
							</Typography>
						</Grid>
						<Box mt={3}>
							<Button
								sx={{
									marginRight: "20px",
								}}
								variant="white"
								type="button"
								onClick={() => router.push("/social/articles")}
							>
								{
									translation?.[
										isEditingArticle ? "article.edit.cancel" : "article_create.cancel_button"
									]
								}
							</Button>
							<Button type="submit" variant="contained" disabled={!isValid}>
								{translation?.[isEditingArticle ? "article.edit.save" : "articles.create_button"]}
							</Button>
						</Box>
					</Grid>
				</SectionItem>
				<SectionItem>
					<UploadBackground
						{...{
							setValue,
							editImageSrc: article?.content?.titleImage?.url,
							setDeleteAvatarCallback: setIsDeleteImage,
						}}
					/>
					<Box mt={3}>
						<InputLabel htmlFor="title" required>
							{translation?.["article_create.title"]}
						</InputLabel>
						<InputBase
							size="small"
							type="text"
							placeholder={translation?.["article_create.title"]}
							required
							fullWidth
							{...register("title", { required: true })}
						/>
					</Box>

					<Box mt={3}>
						<InputLabel>{translation?.["article_create.text"]}</InputLabel>
						<HTMLEditor
							onChange={onChangeContentHandler}
							formats={articleHTMLFormats}
							modules={articleHTMLModules}
							value={article?.content?.content || ""}
						/>
					</Box>
					<Box mt={3}>
						<InputLabel htmlFor="select" required>
							{translation?.["article_create.public_to"]}
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
