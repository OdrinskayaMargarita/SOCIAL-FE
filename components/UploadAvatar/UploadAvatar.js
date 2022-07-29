import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import useFileReader from "hooks/useFilereader";
import { getGroupData, updateGroup } from "store/thunks/group.thunks";
import { GROUP_VIEW_TYPES } from "store/constants/groups.constants";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import image from "../../styles/images/image.svg";

const UploadAvatar = ({
	children,
	setValue,
	setAvatarImage,
	id,
	viewType,
	withoutIcon,
	isButton,
	isChooseImageBlocked,
	...props
}) => {
	const [{ result, file }, setFile, clearFile] = useFileReader({
		method: "readAsDataURL",
	});

	const dispatch = useDispatch();

	const [selectedFile, setSelectedFile] = useState(null);

	const onFileUpload = useCallback(
		(event, type) => {
			setFile(event.target.files[0]);
		},
		[setFile],
	);

	useEffect(async () => {
		const filename = file?.name || null;
		const content = result ? result.split(",")[1] : null;
		setAvatarImage(result);
		if (viewType === GROUP_VIEW_TYPES.FIRST_EDIT && content) {
			try {
				const {
					payload: { success },
				} = await dispatch(updateGroup({ id_group: +id, avatar_image: { filename, content } }));
				if (success) {
					clearFile();
					dispatch(getGroupData(id));
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			setValue("avatar", {
				filename,
				content,
			});
		}
	}, [file, result]);
	const inputFileRef = useRef();

	const triggerInput = () => {
		inputFileRef.current.click();
	};

	return (
		<>
			{isButton ? (
				<label htmlFor="upload-avatar">
					<input
						type="file"
						value=""
						ref={inputFileRef}
						id="upload-avatar"
						accept=".jpg,.png"
						autoComplete="off"
						onChange={onFileUpload}
						hidden
					/>
					{children}
				</label>
			) : (
				<>
					<Box
						sx={{
							borderRadius: "50%",
							backgroundColor: "#fff",
							position: "relative",
							zIndex: "4",
							padding: "5px",
						}}
					>
						<Box
							onClick={!isChooseImageBlocked ? triggerInput : null}
							sx={{
								position: "relative",
								backgroundColor: "#fff",
								borderRadius: "50%",
								width: 160,
								height: 160,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								border: "1px solid rgba(116, 136, 147, 0.3)",
							}}
						>
							<input
								type="file"
								value=""
								ref={inputFileRef}
								id="upload-avatar"
								accept=".jpg,.png"
								autoComplete="off"
								onChange={onFileUpload}
								hidden
							/>
							<img src={image.src} alt="" />
							<Typography fontSize="14px" color="#171717" mt={2} align="center">
								Загрузить логотип
							</Typography>
						</Box>
					</Box>
					{!withoutIcon && <div />}
					{children}
				</>
			)}
		</>
	);
};

export default UploadAvatar;
