import React, { useRef, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useFileReader from "hooks/useFilereader";
import { Image } from "@mui/icons-material";
import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import ErrorMessage from "core-components/ErrorMessage/ErrorMessage";
import { BYTES_LIMIT } from "store/constants/app.constants";
import { useSelector } from "react-redux";
import IconPhotoGradient from "../../styles/assets/images/icon-photo-gradient.svg";

const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	align-items: center;
	justify-content: center;
	background: #ffffff;
	border: 1px solid rgba(109, 144, 155, 0.3);
	box-sizing: border-box;
	border-radius: 8px;
	height: 280px;
	cursor: pointer;
	margin-top: 16px;
`;

const ImageContainerComplete = styled.div`
	height: 100%;
	width: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	cursor: auto;
	border-radius: 8px;
	background-image: ${({ backgroundSrc }) => `url(${backgroundSrc})`};
	button {
		position: absolute;
		border: 1px solid rgba(109, 144, 155, 0.3);
		box-shadow: 0px 5px 10px rgba(58, 143, 173, 0.05), 0px 1px 2px rgba(58, 143, 173, 0.1);
		top: 20px;
		right: 20px;
	}
`;

const Upload = styled(Typography)`
	margin-top: 16px;
	max-width: 120px;
	text-align: center;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	color: #171717;
`;

const Placeholder = styled(Typography)`
	text-align: center;
	position: absolute;
	bottom: 20px;
	font-size: 13px;
	line-height: 20px;
	text-align: center;
	color: #748893;
`;

const UploadInput = styled.input`
	display: none;
`;

export const UploadBackground = ({ setValue, editImageSrc, setDeleteAvatarCallback }) => {
	const { translation } = useSelector((state) => state.app);
	const [error, setError] = useState(false);
	const fileUploaderRef = useRef(null);
	const [isShowInititalImage, setIsShowInitialImage] = useState(false);

	const [{ result, file }, setFile, clearFile] = useFileReader({
		method: "readAsDataURL",
	});

	const handleAvatarClick = useCallback(() => {
		if (fileUploaderRef.current) {
			fileUploaderRef.current.click();
		}
	}, [fileUploaderRef]);

	const handleEraseImage = useCallback(() => {
		if (setDeleteAvatarCallback) setDeleteAvatarCallback(true);
		setIsShowInitialImage(false);
		clearFile();
	}, [clearFile, setIsShowInitialImage, setDeleteAvatarCallback]);

	const onFileUpload = useCallback(
		(event) => {
			if (event.target.files[0].size > BYTES_LIMIT) {
				setError(true);
				return;
			}
			setError(false);

			setFile(event.target.files[0]);
			if (setDeleteAvatarCallback) setDeleteAvatarCallback(false);
		},
		[setFile],
	);

	useEffect(() => {
		const filename = file?.name || null;
		const content = result ? result.split(",")[1] : null;
		setValue("avatar", {
			filename,
			content,
		});
	}, [file, result]);

	useEffect(() => {
		if (editImageSrc) {
			setIsShowInitialImage(true);
		}
	}, [editImageSrc]);

	return (
		<>
			<Typography variant="h3">{translation?.["event.title.photo"]}</Typography>
			<ImageContainer onClickCapture={handleAvatarClick}>
				{result || (editImageSrc && isShowInititalImage) ? (
					<ImageContainerComplete backgroundSrc={isShowInititalImage ? editImageSrc : result}>
						<Button variant="white" type="button" onClick={handleEraseImage}>
							{translation?.["event.title.photo.delete"]}
						</Button>
					</ImageContainerComplete>
				) : (
					<>
						<img src={IconPhotoGradient.src} alt="" />
						<Upload>{translation?.["group.edit.photo_upload_button"]}</Upload>
						<Placeholder>{translation?.["article_create.photo.upload_validation"]}</Placeholder>
						<UploadInput
							type="file"
							value=""
							accept=".png,.jpeg,.jpg"
							id="file-uploader"
							onChange={onFileUpload}
							ref={fileUploaderRef}
						/>
					</>
				)}
			</ImageContainer>
			{error && <ErrorMessage>{translation?.["event.format"]}</ErrorMessage>}
		</>
	);
};
