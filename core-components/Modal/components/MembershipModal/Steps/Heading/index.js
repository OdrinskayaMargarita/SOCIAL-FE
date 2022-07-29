import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { closeModal } from "store/reducers/app.reducer";

const HeadingContainer = styled.div`
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	margin-bottom: 1rem;
	text-align: center;
	border-bottom: 1px solid #e1e9eb;
	position: relative;
	padding: 0 15px;
`;

export const ModalHeading = ({ step, showPrevStep, showNextStep }) => {
	const { t } = useTranslation();
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const clearModal = useCallback(() => {
		dispatch(closeModal());
	}, [dispatch]);

	return (
		<HeadingContainer>
			<IconButton onClick={showPrevStep} sx={{ visibility: step === 0 ? "hidden" : "visibility" }}>
				<ArrowBackIcon size="large" />
			</IconButton>
			<Box>
				<Typography fontSize={15} fontWeight={500}>
					{translation?.["become_a_member_form1.title"]}
				</Typography>
				<Typography fontSize={13} color="primary.lightblue">{`${
					translation?.["become_a_member_form1.step"]
				} ${step + 1} ${translation?.["become_a_member_form1.outOf"]} 5`}</Typography>
			</Box>
			<Box
				sx={{
					width: "100%",
					height: 4,
					position: "absolute",
					bottom: 0,
					left: 0,
				}}
			>
				<Box
					sx={{
						width: `${step * 25}%`,
						height: "100%",
						bgcolor: "primary.brand",
						borderRadius: "0 15px 0 0",
						transition: "0.3s ease-out",
					}}
				/>
			</Box>
			<IconButton onClick={clearModal}>
				<CloseIcon size="large" />
			</IconButton>
		</HeadingContainer>
	);
};
