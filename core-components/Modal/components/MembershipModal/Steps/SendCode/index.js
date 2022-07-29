import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { becomeMemberCode, confirmMemberCode } from "store/thunks/profile.thunks";
import SecureCodeInput from "core-components/SecureCodeInput/SecureCodeInput";
import { ControlsContainer, MembershipContainer } from "../../styled";

export const SendCode = ({ showNextStep }) => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const memberSecureCode = useSelector((state) => state.profile.invoice.memberSecureCode);
	const [seconds, setSeconds] = useState(60);
	const [isTimerActive, setIsTimerActive] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [secureCode, setSecureCode] = useState("");

	const sendSecureCode = useCallback(async () => {
		try {
			const {
				payload: { success, error },
			} = await dispatch(becomeMemberCode());
			if (error) {
				setErrorMessage(error.message || error.code);
			}
		} catch (error) {
			console.error(error);
		}
	}, [dispatch, setErrorMessage]);

	const sendCodeAgain = useCallback(() => {
		if (!isTimerActive) {
			sendSecureCode();
			setIsTimerActive(true);
		}
	}, [sendSecureCode, setIsTimerActive]);

	const submitMemberCode = useCallback(async () => {
		try {
			const {
				payload: { success, error },
			} = await dispatch(
				confirmMemberCode({
					memberSecureCode,
					secureCode,
				}),
			);
			if (success) {
				showNextStep();
			} else {
				setErrorMessage(error.message || error.code);
			}
		} catch (error) {
			console.error(error);
		}
	}, [dispatch, setErrorMessage, memberSecureCode, secureCode]);

	useEffect(async () => {
		sendSecureCode();
	}, []);

	useEffect(() => {
		let interval = null;
		if (seconds === 0) {
			setIsTimerActive(false);
			setSeconds(60);
			clearInterval(interval);
		} else if (isTimerActive) {
			interval = setInterval(() => {
				setSeconds((secs) => secs - 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isTimerActive, seconds]);

	return (
		<div>
			<MembershipContainer>
				<Typography mb={3} variant="h2">
					{translation?.["become_a_member_form4.subtitle"]}
				</Typography>
				<Typography mb={4} color="primary.lightblue">
					{translation?.["become_a_member_form4.description"]} <span>{user?.email}</span>
				</Typography>
				{errorMessage && (
					<Alert sx={{ my: 2 }} severity="error">
						{translation?.["enter_the_code_form.invalid_code_error"]}
					</Alert>
				)}
				<SecureCodeInput onSubmit={(code) => setSecureCode(code)} />
				<Box mt={4} display="flex" alignItems="center">
					<Typography mr={1}>{translation?.["become_a_member_form4.hint"]}</Typography>
					<Button variant="subaction-button" onClick={() => sendCodeAgain()}>
						{isTimerActive
							? `00:${seconds} ${translation?.["become_a_member_form4.second"]}`
							: translation?.["become_a_member_form4.send_once_again_button"]}
					</Button>
				</Box>
			</MembershipContainer>
			<ControlsContainer>
				<Button fullWidth disabled={!secureCode.length} onClick={submitMemberCode} variant="fat">
					{translation?.["become_a_member_form1.continue_button"]}
				</Button>
			</ControlsContainer>
		</div>
	);
};
