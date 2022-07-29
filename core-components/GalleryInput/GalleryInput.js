import React, { useRef, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { cloneDeep } from "lodash";
import CloseIcon from "@mui/icons-material/Close";

import styled from "@emotion/styled";
import { BYTES_LIMIT } from "store/constants/app.constants";
import ErrorMessage from "core-components/ErrorMessage/ErrorMessage";
import { Loading } from "components/common";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import IconPhotoGradient from "../../styles/assets/images/icon-photo-gradient.svg";

const GaleryWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	max-height: 238px;
	overflow-x: hidden;
	flex-wrap: wrap;

	&-loader {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: black;
		opacity: 0.2;
	}

	input {
		display: none;
	}
`;

const ImageItem = styled.div`
	max-width: 113px;
	height: 113px;
	margin: 2px;
	border: 1px solid rgba(116, 136, 147, 0.3);
	box-sizing: border-box;
	border-radius: 8px;
	position: relative;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	flex-basis: 33%;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 27px 17px 23px;
	cursor: pointer;

	p {
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		text-align: center;
		color: #171717;
		margin-top: 8px;
	}
`;

const CloseIconWrapper = styled.div`
	position: absolute;
	top: 8px;
	right: 8px;
	background: #ffffff;
	border: 1px solid rgba(116, 136, 147, 0.3);
	box-sizing: border-box;
	border-radius: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;

	i {
		margin: 0 !important;
	}
`;

const ImageWrap = styled.div`
	width: 113px;
`;

export const GalleryInput = ({ files, setFiles }) => {
	const { translation } = useSelector((state) => state.app);
	const [error, setError] = useState(false);
	const fileInput = useRef(null);
	const galleryRef = useRef(null);

	const [isLoading, setIsLoading] = useState(false);

	const handleUploadClick = useCallback(() => {
		if (fileInput.current) {
			fileInput.current.click();
		}
	}, [fileInput]);

	const handleFile = useCallback(
		(file) => {
			if (file.size > BYTES_LIMIT) {
				setError(true);
				return;
			}
			setError(false);

			const reader = new FileReader(file);
			reader.onloadstart = () => {
				setIsLoading(true);
			};
			reader.onloadend = () => {
				setIsLoading(false);
				galleryRef.current.scrollTop = galleryRef.current.scrollHeight;
			};
			reader.onload = (e) => {
				setFiles((current) => [...current, { filename: file.name, content: e.target.result }]);
			};
			try {
				reader.readAsDataURL(file);
			} catch (e) {
				console.error(e);
			}
		},
		[setIsLoading, setFiles, galleryRef],
	);

	const inputHandler = useCallback((event) => {
		[...event.target.files].forEach((file) => handleFile(file));
	}, []);

	const deleteFileFromGallery = useCallback(
		(index) => {
			const filesToEdit = cloneDeep(files);
			filesToEdit.splice(index, 1);
			setFiles(filesToEdit);
		},
		[files, cloneDeep, setFiles],
	);

	return (
		<GaleryWrapper ref={galleryRef}>
			{isLoading ? <Loading /> : null}
			{files.map((file, index) => (
				<ImageItem
					key={index}
					src={file.content}
					style={{ backgroundImage: `url(${file.content})` }}
				>
					<CloseIconWrapper onClickCapture={() => deleteFileFromGallery(index)}>
						<CloseIcon />
					</CloseIconWrapper>
				</ImageItem>
			))}
			<input
				multiple
				type="file"
				value=""
				onChange={inputHandler}
				ref={fileInput}
				accept=".png,.jpg"
			/>
			<ImageWrap>
				<ImageItem>
					<InputContainer onClickCapture={handleUploadClick}>
						<img src={IconPhotoGradient.src} alt="icon" />
						<Typography>{translation?.["group.edit.photo_upload_button"]}</Typography>
					</InputContainer>
				</ImageItem>
				{error && <ErrorMessage>{translation?.["event.format"]}</ErrorMessage>}
			</ImageWrap>
		</GaleryWrapper>
	);
};
