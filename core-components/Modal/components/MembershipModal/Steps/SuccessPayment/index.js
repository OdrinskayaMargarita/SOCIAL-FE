import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

import { closeModal } from "store/reducers/app.reducer";
import Avatar from "core-components/Avatar";

const SuccessContainer = styled.div`
	min-height: 528px;
	box-sizing: border-box;
	background: url("../../../../../../styles/images/cooperator-background.png") top / contain
		no-repeat;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 107px 64px 40px;
`;
const AvatarContainer = styled.div`
	width: 176px;
	height: 176px;
	border-radius: 50%;
	overflow: hidden;
	padding: 4px;
	background: #fff;
	z-index: 1;

	.MuiAvatar-root {
		width: 100%;
		height: 100%;
	}
`;

export const SuccessPayment = () => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const { avatar, firstname, lastname } = useSelector((state) => state.auth.user);

	return (
		<SuccessContainer>
			<AvatarContainer>
				<Avatar src={avatar?.url} firstName={firstname} lastName={lastname} bigAvatar />
			</AvatarContainer>
			<Typography mb={3} mt={3} variant="h2">
				{translation?.["become_a_member_form5.successTitle"]}
			</Typography>
			<Typography mb={4} color="primary.lightblue">
				{translation?.["become_a_member_form5.successDescription"]}
			</Typography>
			<Button fullWidth onClick={() => dispatch(closeModal())} variant="fat">
				{translation?.["become_a_member_form5.successButton"]}
			</Button>
		</SuccessContainer>
	);
};
