import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { cooperatorPrice } from "store/constants/app.constants";
import { checkCooperatorPayment } from "store/thunks/profile.thunks";
import { PAYMENT_STATUSES } from "store/constants/profile.constants";
import { closeModal } from "store/reducers/app.reducer";
import { fetchUserProfile } from "store/thunks/auth.thunks";

import { ControlsContainer, MembershipContainer } from "../../styled";

export const Payment = ({ showNextStep }) => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const { url, uuid } = useSelector((state) => state.profile.invoice);
	let paymentInterval = null;
	const proceedPayment = useCallback(() => {
		const win = window.open(url, "_blank");
		win.focus();
		const interval = null;
		// @todo rewrite by BACKEND side to returnUrlLink or WebSockets
		paymentInterval = setInterval(async () => {
			const {
				payload: { success, data },
			} = await dispatch(checkCooperatorPayment({ uuid }));
			if (success) {
				if (data?.status === PAYMENT_STATUSES.SUCCESS) {
					clearInterval(paymentInterval);
					dispatch(fetchUserProfile());
					showNextStep();
				} else if (data?.status !== PAYMENT_STATUSES.WAITING) {
					clearInterval(paymentInterval);
					dispatch(closeModal());
				}
			}
		}, 3000);
	}, [dispatch, clearInterval, showNextStep]);
	useEffect(() => () => clearInterval(paymentInterval), []);

	return (
		<>
			<MembershipContainer>
				<Typography variant="h2" mb={3}>
					{translation?.["become_a_member_form5.subtitle"]}
				</Typography>
				<Typography mb={1} fontWeight="fontWeightBold">
					{translation?.["become_a_member_form5.description_title1"]}
				</Typography>
				<Typography mb={5} color="primary.lightblue">
					{translation?.["become_a_member_form5.description2"]}
				</Typography>
				<Typography mb={0.5} color="primary.dark">
					{translation?.["become_a_member_form4.willCost"]}
				</Typography>
				<Typography fontWeight="fontWeightBold" fontSize={56} mb={0.5} color="primary.dark">
					{cooperatorPrice}
					<Typography fontWeight="fontWeightMedium" fontSize={32} display="inline">
						₴
					</Typography>
				</Typography>
				<Typography color="primary.lightblue">
					{translation?.["become_a_member_form5.description2"]}
				</Typography>
			</MembershipContainer>
			<ControlsContainer>
				<Button fullWidth onClick={proceedPayment} variant="fat">
					{translation?.["become_a_member_form5.pay_button"]}
				</Button>
			</ControlsContainer>
		</>
	);
};
