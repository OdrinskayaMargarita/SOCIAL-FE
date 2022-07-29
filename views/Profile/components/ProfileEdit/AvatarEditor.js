import React, { useState, useEffect, useRef } from "react";
import useFileReader from "hooks/useFilereader";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import { BYTES_LIMIT } from "store/constants/app.constants";
import { useSelector } from "react-redux";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Typography from "@mui/material/Typography";
import Avatar from "../../../../core-components/Avatar";

const BigAvatar = styled.div`
	border-radius: 50%;
	width: 160px;
	height: 160px;
	border: 2px solid #fff;
	z-index: 2;
	position: relative;
	cursor: pointer;
	.MuiAvatar-root {
		width: 100%;
		height: 100%;
		z-index: 2;
		position: relative;
	}
	&::before {
		position: absolute;
		width: 100%;
		height: 100%;
		content: "";
		background: rgba(116, 136, 147, 0.8);
		opacity: 0;
		border-radius: 50%;
		z-index: 5;
		transition: 500ms;
	}
	.MuiSvgIcon-root {
		z-index: 6;
		opacity: 0;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		transition: 500ms;
		margin: auto;
		color: #fff;
	}
	&:hover {
		&::before {
			opacity: 1;
		}
		.MuiSvgIcon-root {
			opacity: 1;
		}
	}
`;

const HiddenInput = styled.input`
	opacity: 0;
	z-index: -1;
	width: 0;
`;

const AvatarEditor = ({ user, setValue, handleDeleteAvatar }) => {
	const { translation } = useSelector((state) => state.app);
	const [isInitialAvatarUsed, setIntialAvatarUsed] = useState(false);
	const [{ result, file }, setFile, clearFile] = useFileReader({
		method: "readAsDataURL",
	});
	const [isUploadAvatarError, setIsUploadAvatarError] = useState(false);
	const fileUploaderRef = useRef(null);

	const handleAvatarClick = () => {
		if (fileUploaderRef.current) {
			fileUploaderRef.current.click();
		}
	};

	const handleEraseImage = () => {
		clearFile();
		fileUploaderRef.current.value = null;
		if (!isInitialAvatarUsed) {
			setIntialAvatarUsed(true);
		}
		handleDeleteAvatar(true);
	};

	const onFileUpload = (event) => {
		if (event.target.files[0].size > BYTES_LIMIT) {
			setIsUploadAvatarError(true);
			return;
		}
		setIsUploadAvatarError(false);
		setFile(event.target.files[0]);
		if (!isInitialAvatarUsed) {
			setIntialAvatarUsed(true);
		}
	};

	useEffect(() => {
		const filename = file?.name || null;
		const content = result ? result.split(",")[1] : null;
		setValue("avatar", {
			filename,
			content,
		});
	}, [file, result]);

	return (
		<Grid container px={[1.5, 3.5]} py={2.5} spacing={2}>
			<Grid item xs={6} md={3}>
				<BigAvatar onClick={handleAvatarClick}>
					<Avatar
						src={!isInitialAvatarUsed ? user.avatar?.url : result}
						alt="avatar"
						firstName={user.firstname}
						lastName={user.lastname}
						bigAvatar
					/>
					<ImageOutlinedIcon />
				</BigAvatar>
			</Grid>
			<Grid item xs={6} md={9}>
				<Typography variant="h3" mb={1}>
					{translation?.["editProfile.photoTitle"]}
				</Typography>
				<Typography mb={3}>{translation?.["editProfile.photoDescription"]}</Typography>
				{isUploadAvatarError && (
					<Typography ml={0.5} mt={0.5} color="primary.error">
						{translation?.["event.format"]}
					</Typography>
				)}
				<Grid container spacing={1} sx={{ flexWrap: { xs: "auto", md: "nowrap" } }}>
					<Grid item>
						<Button variant="lightBlue" onClick={handleAvatarClick}>
							{translation?.["editProfile.btnUploadPhoto"]}
						</Button>
						<HiddenInput
							type="file"
							value=""
							accept=".png,.jpeg,.jpg"
							id="file-uploader"
							onChange={onFileUpload}
							ref={fileUploaderRef}
						/>
					</Grid>
					<Grid item>
						<Button onClick={handleEraseImage} variant="grey">
							{translation?.["editProfile.btnDeletePhoto"]}
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default AvatarEditor;
