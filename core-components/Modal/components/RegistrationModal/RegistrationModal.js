import React, { useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "components/common/Loading";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { closeModal, loadEnd, loadStart, openModal } from "store/reducers/app.reducer";
import {
	checkUserEmail,
	confirmCode,
	createAccount,
	createSocialAccount,
	sendCode,
	fetchUserProfile,
} from "store/thunks/auth.thunks";
import { parseGoogleResponse } from "utils/auth.utils";
import { GOOGLE_AUTH_RESPONSE_TYPES } from "store/constants/auth.constants";
import { MODAL_TYPES } from "core-components/Modal/constants";

import { EmailForm, SecureCodeForm, UserDataForm } from "./components";
import validationShema from "./form.schema";

const STEPS = ["email", "userData", "secureCode"];
const STEPS_KEYS = {
	EMAIL: "email",
	USER_DATA: "userData",
	SECURE_CODE: "secureCode",
};
const STEPS_COMPONENTS = {
	[STEPS_KEYS.EMAIL]: EmailForm,
	[STEPS_KEYS.USER_DATA]: UserDataForm,
	[STEPS_KEYS.SECURE_CODE]: SecureCodeForm,
};

const RegistrationView = ({ incomingStep = 0 }) => {
	const { t } = useTranslation();
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const router = useRouter();
	const { isLoading, isLoggedIn, currentUser } = useSelector((state) => ({
		isLoading: state.app.isLoading,
		isLoggedIn: state.auth.isLoggedIn,
		currentUser: state.auth.user,
	}));
	const {
		register,
		handleSubmit,
		trigger,
		setValue,
		formState: { errors },
		getValues,
	} = useForm({
		resolver: yupResolver(validationShema),
	});
	const [formError, setFormError] = useState("");
	const [step, setStep] = useState(STEPS[incomingStep]);
	const StepComponent = isLoading ? Loading : STEPS_COMPONENTS[step];

	const changeModal = (value) => {
		dispatch(openModal(value));
	};

	const createSocial = async (data) => {
		dispatch(loadStart());
		try {
			const {
				payload: { success, error },
			} = await dispatch(createSocialAccount(data));
			if (!success) {
				setFormError(error?.message);
			}
		} catch (e) {
			console.error(e);
		} finally {
			dispatch(loadEnd());
		}
	};

	const responseGoogle = async (response) => {
		if (!response.error) {
			const parsedUserData = parseGoogleResponse(response, GOOGLE_AUTH_RESPONSE_TYPES.REG);
			setValue("source", "social");
			const {
				payload: { success, error, data },
			} = await dispatch(checkUserEmail(parsedUserData.email));
			if (success) {
				if (data) {
					setFormError(translation?.["create_account_form.already_exist_error"]);
				} else {
					createSocial(parsedUserData);
				}
			}
		}
	};

	const responseFacebook = (response) => {
		setStep(STEPS_KEYS.EMAIL);
	};

	const handleContinue = async () => {
		const valid = await trigger("email");
		if (valid) {
			try {
				dispatch(loadStart());
				const {
					payload: { success, error, data },
				} = await dispatch(checkUserEmail(getValues("email")));
				if (success) {
					if (data) {
						setFormError(translation?.["create_account_form.already_exist_error"]);
					} else {
						setStep(STEPS_KEYS.USER_DATA);
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
	};

	const sendSecureCode = async () => {
		dispatch(loadStart());
		const {
			payload: { success, error },
		} = await dispatch(sendCode());
		if (!success) {
			setFormError(translation?.["enter_the_code_form.invalid_code_error"]);
		}
		dispatch(loadEnd());
	};

	const header = useMemo(() => {
		return step !== STEPS_KEYS.SECURE_CODE ? (
			<>
				<Typography mb={2} variant="h2">
					{translation?.["create_account_form.title"]}
				</Typography>
				<Typography mb={3} sx={{ display: "flex", alignItems: "center" }}>
					{translation?.["create_account_form.hint"]}{" "}
					<Button onClick={() => changeModal(MODAL_TYPES.LOGIN_MODAL)} variant="subaction-button">
						{translation?.["sign_in_form.sign_in_button"]}
					</Button>
				</Typography>
			</>
		) : (
			<>
				<Typography mb={2} variant="h2">
					{translation?.["enter_the_code_form.title"]}
				</Typography>
				<Typography mb={3}>
					{translation?.["enter_the_code_form.description"]} <strong>{getValues("email")}</strong>
				</Typography>
			</>
		);
	}, [step, getValues, t]);

	const confirmSecureCode = async (code) => {
		dispatch(loadStart());
		const {
			payload: { success, error },
		} = await dispatch(confirmCode(code));
		if (success) {
			dispatch(fetchUserProfile());
		} else {
			setFormError(error.message);
		}
		dispatch(loadEnd());
	};

	const onSubmitHandler = async (data) => {
		try {
			dispatch(loadStart());
			const {
				payload: { success, error },
			} = await dispatch(createAccount(data));
			if (success) {
				setStep(STEPS_KEYS.SECURE_CODE);
			} else {
				setFormError(error.message);
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			dispatch(loadEnd());
		}
	};

	useEffect(() => {
		if (router.query?.step) {
			setStep(STEPS[+router.query?.step]);
		}
	}, []);

	useEffect(() => {
		if (isLoggedIn && currentUser?.isConfirmed) {
			router.replace("/social/news");
			dispatch(closeModal());
		}
	}, [isLoggedIn, router, currentUser]);

	useEffect(() => {
		setFormError("");
		if (step === STEPS_KEYS.SECURE_CODE) {
			sendSecureCode();
		}
	}, [step]);

	return (
		<>
			<Head>
				<title>{translation?.["create_account_form.title"]}</title>
			</Head>
			<Box width={["auto", 410]} p={[2.5, 3]}>
				<>
					{header}
					{!isLoading && formError && (
						<Alert sx={{ my: 1 }} severity="error">
							{formError}
						</Alert>
					)}
					<StepComponent
						register={register}
						errors={errors}
						handleContinue={handleContinue}
						handleSubmit={handleSubmit(onSubmitHandler)}
						onConfirm={confirmSecureCode}
						resendCode={sendSecureCode}
						responseGoogle={responseGoogle}
						responseFacebook={responseFacebook}
					/>
				</>
			</Box>
		</>
	);
};

export default RegistrationView;
