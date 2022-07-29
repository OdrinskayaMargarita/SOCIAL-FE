import React, { useCallback, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "components/common/Loading";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { loadEnd, loadStart, openModal } from "store/reducers/app.reducer";
import {
	endForgotPassword,
	initiateForgotPassword,
	sendCodeForgotPassword,
} from "store/thunks/auth.thunks";
import { MODAL_TYPES } from "core-components/Modal/constants";

import { EmailForm, PasswordForm, SecureCodeForm } from "./components";
import validationShema from "./form.schema";

const STEPS_KEYS = {
	EMAIL: "email",
	SECURE_CODE: "secureCode",
	PASSWORD: "password",
};
const STEPS_COMPONENTS = {
	[STEPS_KEYS.EMAIL]: EmailForm,
	[STEPS_KEYS.SECURE_CODE]: SecureCodeForm,
	[STEPS_KEYS.PASSWORD]: PasswordForm,
};
const ForgotPasswordModal = () => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const router = useRouter();
	const [step, setStep] = useState(STEPS_KEYS.EMAIL);
	const [formError, setFormError] = useState("");
	const [formInfo, setFormInfo] = useState("");
	const isLoading = useSelector((state) => state.app.isLoading);
	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors },
		getValues,
	} = useForm({
		resolver: yupResolver(validationShema),
	});
	const StepComponent = isLoading ? Loading : STEPS_COMPONENTS[step];

	const header = useMemo(() => {
		const keysMap = {
			[STEPS_KEYS.EMAIL]: [
				translation?.["reset_password_form.title"],
				translation?.["reset_password_form.description"],
			],
			[STEPS_KEYS.SECURE_CODE]: [
				translation?.["sign_in_form.forgot_password_button"],
				`${translation?.["enter_the_code_form.description"]} ${getValues("email")}`,
			],
			[STEPS_KEYS.PASSWORD]: [
				translation?.["set_new_password_form.new_password_hint"],
				translation?.["set_new_password_form.repeat_password_hint"],
			],
		};
		const [headerText, subheaderText] = keysMap[step];
		return (
			<Box my={0.5}>
				<Typography mb={2} variant="h2">
					{headerText}
				</Typography>
				<Typography color="primary.lightblue" mb={3}>
					{subheaderText}
				</Typography>
			</Box>
		);
	}, [step, translation, getValues]);

	const sendSecureCode = useCallback(async () => {
		const valid = await trigger("email");
		const email = getValues("email");
		setFormError("");
		setFormInfo("");
		if (valid) {
			try {
				dispatch(loadStart());
				const {
					payload: { success, error },
				} = await dispatch(initiateForgotPassword(email));
				if (success) {
					if (step !== STEPS_KEYS.SECURE_CODE) {
						setStep(STEPS_KEYS.SECURE_CODE);
					}
				} else {
					setFormError(error.message);
				}
			} catch (error) {
				console.error(error || error.message);
			} finally {
				dispatch(loadEnd());
			}
		}
	}, [setStep, trigger, dispatch, getValues, step]);

	const handleCodeSend = useCallback(
		async (code) => {
			try {
				dispatch(loadStart());
				const {
					payload: { success, error },
				} = await dispatch(sendCodeForgotPassword(code));
				if (success) {
					setStep(STEPS_KEYS.PASSWORD);
				} else {
					setFormError(error.message);
				}
			} catch (error) {
				console.error(error || error.message);
			} finally {
				dispatch(loadEnd());
			}
		},
		[dispatch, setStep, setFormError],
	);

	const onSubmitHandler = useCallback(
		async (data) => {
			dispatch(loadStart());
			const { email, password } = data;

			try {
				const {
					payload: { success, error },
				} = await dispatch(endForgotPassword({ email, password }));
				if (success) {
					setFormInfo(translation?.["set_new_password_form.description"]);
					setTimeout(() => {
						setFormInfo("");
						dispatch(openModal(MODAL_TYPES.LOGIN_MODAL));
					}, 3e3);
				} else {
					setFormError(error.message);
				}
			} catch (error) {
				console.error(error || error.message);
			} finally {
				dispatch(loadEnd());
			}
		},
		[dispatch, router, getValues, translation],
	);

	const changeModal = (value) => {
		dispatch(openModal(value));
	};
	return (
		<Box width={["auto", 410]} p={[2.5, 3]}>
			<Head>
				<title>{translation?.["set_new_password_form.title"]}</title>
			</Head>
			<>
				{header}
				{!isLoading && formError && (
					<Alert sx={{ my: 1 }} severity="error">
						{formError}
					</Alert>
				)}
				{!isLoading && formInfo && (
					<Alert sx={{ my: 1 }} severity="success">
						{formInfo}
					</Alert>
				)}
				<StepComponent
					register={register}
					errors={errors}
					onConfirm={handleCodeSend}
					resendCode={sendSecureCode}
					handleContinue={sendSecureCode}
					handleSubmit={handleSubmit(onSubmitHandler)}
				/>
			</>
		</Box>
	);
};

export default ForgotPasswordModal;
