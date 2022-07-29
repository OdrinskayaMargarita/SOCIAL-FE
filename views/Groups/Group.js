import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import SmartFeed from "components/smart/SmartFeed";
import { Loading, Scroller } from "components/common";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import {
	updateGroup,
	fetchGoupRelatedEntities,
	getGroupData,
	leaveGroup,
	joinGroup,
	getCountries,
} from "store/thunks/group.thunks";
import { changeGroupData, clearEntities } from "store/reducers/group.reducer";
import {
	groupsMembersRole,
	groupTypes,
	GROUP_VIEW_TYPES,
	inviteGroupButtonText,
} from "store/constants/groups.constants";
import { useForm } from "react-hook-form";
import useFileReader from "hooks/useFilereader";
import { openModal } from "store/reducers/app.reducer";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { MODAL_TYPES } from "core-components/Modal/constants";
import EmptyFeeds from "core-components/EmptyFeeds/EmptyFeeds";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Popover } from "@mui/material";
import ItemHeader, { ItemHeaderBack, ItemHeaderImage } from "../../components/common/ItemHeader";
import ItemHeaderInfo from "../../components/common/ItemHeader/Info";
import UploadAvatar from "../../components/UploadAvatar";
import { EditFormGroup } from "./components/EditFormGroup";
import Layout from "../../core-components/Layout/Layout";
import GroupWallet from "../../components/Feed/components/Wallet/Wallet";
import { GroupMembers } from "./components/Member/GroupMembers";
import backgroundDefault from "../../styles/images/member-background.png";
import image from "../../styles/images/image.svg";
import { SmartLayout } from "../../components";

const StyledTab = styled(Tab)`
	text-transform: none;
	font-weight: 600;
	font-size: 14px;
	&.MuiTabs-indicator {
		width: 100px;
	}
`;

const GroupView = () => {
	const { t } = useTranslation();
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const {
		query: { id, firstEdit },
	} = useRouter();
	const [{ result, file }, setFile, clearFile] = useFileReader({
		method: "readAsDataURL",
	});
	const inputFileRef = useRef();
	const { register, handleSubmit, setValue, reset } = useForm();

	const {
		itself: group,
		entities: feeds,
		hasMore,
		wallet,
	} = useSelector((state) => state.group.data);
	const countries = useSelector((state) => state.group.countries);
	const { user } = useSelector((state) => state.auth);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const [avatarImage, setAvatarImage] = useState(null);
	const [backgroundImage, setBackgroundImage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const isUserOwner = useMemo(() => user?.id === group?.owner?.id, [user, group]);

	const initialViewType = useMemo(() => {
		return firstEdit && isUserOwner ? GROUP_VIEW_TYPES.FIRST_EDIT : GROUP_VIEW_TYPES.DEFAULT;
	}, [firstEdit, GROUP_VIEW_TYPES, isUserOwner]);

	const [viewType, setViewType] = useState(initialViewType);

	const tabs = useMemo(
		() => [
			{
				menuItem: translation?.["feed.title"],
				key: "ALL",
			},
			{
				menuItem: translation?.["group.members"],
				key: "MEMBER",
			},
			{
				menuItem: translation?.["articles.header"],
				key: "ARTICLE",
			},
			{
				menuItem: translation?.["group.events"],
				key: "EVENT",
			},
			{
				menuItem: translation?.["group.solutions"],
				key: "VOTING",
			},
		],
		[translation],
	);

	const [activeTab, setActiveTab] = useState(tabs[0].key);

	const fetchFeeds = () => {
		dispatch(fetchGoupRelatedEntities({ id, type: activeTab }));
	};

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	const changeViewType = (type) => {
		setViewType(type);
	};

	const closeEditMode = useCallback(() => {
		setErrorMessage(null);
		const valueToSet = firstEdit ? GROUP_VIEW_TYPES.FIRST_EDIT : GROUP_VIEW_TYPES.DEFAULT;
		reset();
		setViewType(valueToSet);
	}, [setViewType, firstEdit]);

	const handleFollowStatus = useCallback(async () => {
		try {
			const action = group.isFollowed ? leaveGroup : joinGroup;
			const {
				payload: { success, data },
			} = await dispatch(action(id));
			if (success) {
				const newRole = groupsMembersRole?.[data];

				if (newRole) {
					dispatch(changeGroupData({ key: "currentUserRole", value: newRole, id }));
				}
				dispatch(changeGroupData({ key: "isFollowed", value: !group.isFollowed, id }));
			}
		} catch (e) {
			console.error(e);
		}
	}, [dispatch, group]);

	const triggerInput = () => {
		inputFileRef.current.click();
	};

	const onBackgroundUpload = (event) => {
		setFile(event.target.files[0]);
	};

	const onSubmitHandler = useCallback(
		async ({
			country,
			background,
			avatar,
			name,
			description,
			city,
			deleteAvatar,
			deleteBackground,
			type,
		}) => {
			setErrorMessage(null);
			try {
				const dataToSend = {
					id_group: +id,
					id_country: +country,
					name,
					description,
					city,
					is_delete_avatar_image: deleteAvatar,
					is_delete_background_image: deleteBackground,
					type: type ? groupTypes.PRIVATE : groupTypes.PUBLIC,
				};
				if (avatar?.content) dataToSend.avatar_image = avatar;
				if (background?.content) dataToSend.background_image = background;
				const {
					payload: { success, error },
				} = await dispatch(updateGroup(dataToSend));
				if (success) {
					closeEditMode();
				}
				if (error) {
					clearFile();
					dispatch(getGroupData(id));
					setErrorMessage(error.message);
					return;
				}
			} catch (e) {
				console.error(e);
				dispatch(getGroupData(id));
			}
		},
		[closeEditMode],
	);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const onOpenLoginModal = () => {
		dispatch(openModal(MODAL_TYPES.LOGIN_MODAL));
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const idPop = open ? "simple-popover" : undefined;

	useEffect(async () => {
		const filename = file?.name || null;
		const content = result ? result.split(",")[1] : null;
		if (viewType === GROUP_VIEW_TYPES.FIRST_EDIT && content) {
			try {
				const {
					payload: { success, error },
				} = await dispatch(updateGroup({ id_group: +id, background_image: { filename, content } }));
				if (success) {
					clearFile();
					dispatch(getGroupData(id));
				}
				if (error) {
					clearFile();
					dispatch(getGroupData(id));
					setErrorMessage(error.message);
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			setValue("background", {
				filename,
				content,
			});
			setBackgroundImage(result);
		}
	}, [file, result]);

	useEffect(fetchFeeds, [activeTab, id, dispatch]);

	useEffect(() => {
		if (id !== undefined) {
			dispatch(getGroupData(id));
		}
	}, [dispatch, id]);

	useEffect(() => {
		setViewType(initialViewType);
	}, [initialViewType]);

	useEffect(() => {
		setBackgroundImage(group?.background?.url);
	}, [group?.background?.url]);

	useEffect(() => {
		if (group?.isFollowed && !tabs.find((item) => item.key === "PAYMENT")) {
			tabs.push({
				menuItem: translation?.["profile_left_sidebar.wallet_button"],
				key: "PAYMENT",
			});
		}
		if (!group?.isFollowed && tabs.find((item) => item.key === "PAYMENT")) {
			tabs.pop();
		}
	}, [group]);

	useEffect(() => {
		if (group && viewType === GROUP_VIEW_TYPES.EDIT) {
			setValue("name", group?.name);
			setValue("city", group?.city);
			setValue("description", group?.description);
			setValue("deleteAvatar", false);
			setValue("deleteBackground", false);
			dispatch(getCountries());
		}
	}, [group, viewType]);

	const isFollowDisabled = groupsMembersRole.OWNER === group?.currentUserRole;

	return (
		<SmartLayout>
			<Head>
				<title>{group?.name}</title>
			</Head>
			<Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
				{group ? (
					<>
						<ItemHeader>
							<Grid container justifyContent="space-between" spacing={2} mb={2}>
								<Grid item>
									{viewType === GROUP_VIEW_TYPES.EDIT ? (
										<Typography variant="h2"> {translation?.["group.edit.title"]}</Typography>
									) : (
										<ItemHeaderBack tab="groups" />
									)}
								</Grid>

								{isUserOwner && (
									<Grid item>
										{viewType === GROUP_VIEW_TYPES.EDIT ? (
											<Grid container spacing={2}>
												<Grid item>
													<Button type="button" variant="white" onClick={closeEditMode}>
														{translation?.["group.edit.cancel_button"]}
													</Button>
												</Grid>
												<Grid item>
													<Button type="submit">
														{translation?.["group.edit.save_changes_button"]}
													</Button>
												</Grid>
											</Grid>
										) : (
											<Button type="button" onClick={() => changeViewType(GROUP_VIEW_TYPES.EDIT)}>
												{translation?.["group.edit.button_text"]}
											</Button>
										)}
									</Grid>
								)}
							</Grid>
							<ItemHeaderImage
								type="group"
								src={backgroundImage || backgroundDefault.src}
								isEditable={viewType !== GROUP_VIEW_TYPES.DEFAULT}
								buttonsBlock={viewType === GROUP_VIEW_TYPES.EDIT && backgroundImage}
							>
								{viewType === GROUP_VIEW_TYPES.EDIT && backgroundImage ? (
									<>
										<Box
											sx={{
												display: "inline-block",
												position: "absolute",
												bottom: "20px",
												right: "20px",
											}}
										>
											<input
												type="file"
												value=""
												ref={inputFileRef}
												id="upload-background"
												accept=".jpg,.png"
												autoComplete="off"
												onChange={onBackgroundUpload}
												hidden
											/>
											<Button variant="lightBlueWithoutOpacity" onClick={triggerInput}>
												{translation?.["group.edit.photo_upload_button"]}
											</Button>
											<Button
												sx={{
													marginLeft: "12px",
												}}
												variant="lightGreyWithoutOpacity"
												onClick={() => {
													setValue("deleteBackground", true);
													setBackgroundImage(null);
												}}
											>
												{translation?.["group.edit.logo_delete_button"]}
											</Button>
										</Box>
									</>
								) : (
									<Box
										sx={{
											position: "absolute",
											top: "0",
											bottom: "0",
											textAlign: "center",
											display: "flex",
											alignItems: "center",
											flexDirection: "column",
											justifyContent: "center",
											width: "100%",
										}}
									>
										<Box
											mb={2}
											sx={{
												width: "54px",
												height: "54px",
												backgroundColor: "#fff",
												boxShadow: " 0px 13px 25px -23px rgba(139, 116, 206, 0.41)",
												borderRadius: "50%",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<img src={image.src} alt="" />
										</Box>
										<ItemHeaderImage.ButtonUpload onClick={triggerInput}>
											<input
												type="file"
												value=""
												ref={inputFileRef}
												id="upload-background"
												accept=".jpg,.png"
												autoComplete="off"
												onChange={onBackgroundUpload}
												hidden
											/>
											{translation?.["group.edit.photo_upload_button"]}
										</ItemHeaderImage.ButtonUpload>
										<Typography mt={2}>Фото будет использоваться как обложка группы</Typography>
									</Box>
								)}
							</ItemHeaderImage>
							<ItemHeaderInfo>
								<ItemHeaderInfo.Avatar
									src={avatarImage || group.avatar?.url}
									name={group.name}
									viewType={viewType}
								>
									{/* {viewType !== GROUP_VIEW_TYPES.DEFAULT && ( */}
									<UploadAvatar
										{...{
											setValue,
											setAvatarImage,
											viewType,
											id,
											isChooseImageBlocked: viewType === GROUP_VIEW_TYPES.DEFAULT,
										}}
									/>
								</ItemHeaderInfo.Avatar>
								{viewType === GROUP_VIEW_TYPES.EDIT && group.avatar ? (
									<>
										<Box mt={3} display="flex" flexGrow="1" justifyContent="flex-end">
											<Typography color="red">{errorMessage}</Typography>
										</Box>
										<ItemHeaderInfo.Meta
											type="group"
											title={t("group.editGroup.changeLogo")}
											description={t("group.editGroup.changeLogoDescription")}
											isEdit={viewType === GROUP_VIEW_TYPES.EDIT}
											actionButtons={
												<>
													<Button variant="lightBlue">
														<UploadAvatar
															{...{ setValue, setAvatarImage, viewType, id, isButton: true }}
														>
															{translation?.["group.edit.logo_upload_button"]}
														</UploadAvatar>
													</Button>
													<Button
														sx={{ marginLeft: "12px" }}
														variant="lightGrey"
														onClick={() => {
															setValue("deleteAvatar", true);
															setAvatarImage(null);
														}}
													>
														{translation?.["group.edit.logo_delete_button"]}
													</Button>
												</>
											}
										/>
									</>
								) : (
									<Box display="flex" flexGrow="1">
										<ItemHeaderInfo.Meta
											type="group"
											title={group?.name}
											description={group?.description}
											city={group?.city}
											country={group?.country?.name}
											members={group?.members}
											totalActivity={group?.feedStatistic?.total}
											actionButtons={
												!isUserOwner && (
													<>
														<Button
															aria-describedby={id}
															variant="subaction-button"
															onClick={handleClick}
															startIcon={<MoreHorizIcon />}
														/>
														<Popover
															id={idPop}
															open={open}
															anchorEl={anchorEl}
															onClose={handleClose}
															anchorOrigin={{
																vertical: "bottom",
															}}
															transformOrigin={{
																vertical: "top",
															}}
														>
															<Button
																styleType="secondary"
																data-group-id={group.id}
																onClick={!isLoggedIn ? onOpenLoginModal : handleFollowStatus}
																variant={group.isFollowed ? "lightGrey" : "lightBlue"}
																disabled={isFollowDisabled}
															>
																{group.isFollowed
																	? translation[inviteGroupButtonText[group.currentUserRole]]
																	: translation["group.join"]}
															</Button>
														</Popover>
													</>
												)
											}
										/>
									</Box>
								)}
							</ItemHeaderInfo>
						</ItemHeader>
						{viewType !== GROUP_VIEW_TYPES.EDIT ? (
							<>
								<Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
									<Tabs
										value={activeTab}
										onChange={handleTabChange}
										indicatorColor="primary"
										textColor="primary"
										variant="scrollable"
										scrollButtons="auto"
										TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
										sx={{
											"& .MuiTabs-flexContainer": {
												justifyContent: "space-between",
											},
											"& .MuiTabs-indicator": {
												display: "flex",
												justifyContent: "center",
												backgroundColor: "transparent",
												height: "4px",
											},
											"& .MuiTabs-indicatorSpan": {
												maxWidth: 50,
												width: "100%",
												borderRadius: "4px 4px 0 0",
												backgroundColor: "#3b59f5",
											},
										}}
									>
										{tabs.map((tab, index) => (
											<StyledTab key={tab.key} value={tab.key} label={tab?.menuItem} />
										))}
									</Tabs>
								</Box>
								{group.currentUserRole === groupsMembersRole.ADMINISTRATOR ||
								group.currentUserRole === groupsMembersRole.MODERATOR ||
								group.currentUserRole === groupsMembersRole.OWNER ||
								group.currentUserRole === groupsMembersRole.FOLLOWER ||
								group.type === groupTypes.PUBLIC ? (
									<>
										{activeTab !== "PAYMENT" && activeTab !== "MEMBER" && (
											<div>
												{feeds && feeds.length ? (
													<Scroller
														hasMore={hasMore}
														items={feeds}
														component={SmartFeed}
														next={fetchFeeds}
														target="feed-list-scroller"
													/>
												) : (
													<EmptyFeeds />
												)}
											</div>
										)}
										{activeTab === "PAYMENT" && <GroupWallet />}
										{activeTab === "MEMBER" && <GroupMembers />}
									</>
								) : (
									<Alert severity="info">{translation["group.edit.hide_content"]}</Alert>
								)}
							</>
						) : (
							<EditFormGroup
								{...{ register, countries, groupType: group?.type, countryId: group?.country?.id }}
							/>
						)}
					</>
				) : (
					<Loading />
				)}
			</Box>
		</SmartLayout>
	);
};

export default GroupView;
