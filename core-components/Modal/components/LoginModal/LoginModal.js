import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { loadEnd, loadStart, openModal, closeModal } from "store/reducers/app.reducer";
import { checkUserEmail, userLogin, userSocialLogin } from "store/thunks/auth.thunks";
import { parseGoogleResponse } from "utils/auth.utils";
import { GOOGLE_AUTH_RESPONSE_TYPES } from "store/constants/auth.constants";
import { MODAL_TYPES } from "core-components/Modal/constants";

import Loading from "../../../../components/common/Loading";
import { EmailForm, PasswordForm } from "./components";
import validationShema from "./form.schema";

const STEPS_KEYS = {
	EMAIL: "email",
	PASSWORD: "password",
};

const STEPS_COMPONENTS = {
	[STEPS_KEYS.EMAIL]: EmailForm,
	[STEPS_KEYS.PASSWORD]: PasswordForm,
};

const LoginView = () => {
	const { translation } = useSelector((state) => state.app);
	const router = useRouter();
	const dispatch = useDispatch();
	const [step, setStep] = useState(STEPS_KEYS.EMAIL);
	const { isLoading, isLoggedIn, isUserConfirmed } = useSelector((state) => ({
		isLoading: state.app.isLoading,
		isLoggedIn: state.auth.isLoggedIn,
		isUserConfirmed: state.auth.user.isConfirmed,
	}));
	const {
		register,
		handleSubmit,
		trigger,
		setValue,
		setError,
		formState: { errors },
		getValues,
	} = useForm({
		resolver: yupResolver(validationShema),
	});
	const StepComponent = isLoading ? Loading : STEPS_COMPONENTS[step];

	const loginSocial = async (data) => {
		dispatch(loadStart());
		try {
			const {
				payload: { success, error },
			} = await dispatch(userSocialLogin(data));
			if (!success) {
				setError("server", { type: "manual", message: error?.message });
			}
		} catch (e) {
			console.error(e);
		} finally {
			dispatch(loadEnd());
		}
	};

	const responseGoogle = async (response) => {
		if (!response.error) {
			const parsedUserData = parseGoogleResponse(response, GOOGLE_AUTH_RESPONSE_TYPES.LOGIN);
			setValue("source", "social");
			loginSocial(parsedUserData);
		}
	};
	const responseFacebook = (response) => {
		setStep(STEPS_KEYS.EMAIL);
	};
	const handleContinue = async (e) => {
		e.preventDefault();
		const valid = await trigger("email");
		if (valid) {
			try {
				dispatch(loadStart());
				const {
					payload: { data },
				} = await dispatch(checkUserEmail(getValues("email")));
				if (data) {
					setStep(STEPS_KEYS.PASSWORD);
				} else {
					setError("server", { type: "manual", message: "Not found a user with this email" });
				}
			} catch (error) {
				console.error(error || error.message);
			} finally {
				dispatch(loadEnd());
			}
		}
	};

	const onSubmitHandler = async (data) => {
		dispatch(loadStart());
		const response = await dispatch(userLogin(data));
		if (response.payload.error) {
			setError("server", { type: "manual", message: response.payload.error.message });
		} else {
			dispatch(closeModal());
		}
		dispatch(loadEnd());
	};

	useEffect(() => {
		if (isLoggedIn) {
			if (isUserConfirmed) {
				router.push("/social/news");
				dispatch(closeModal());
			} else {
				dispatch(openModal(MODAL_TYPES.UNCONFIRMED_MODAL));
			}
		}
	}, [isLoggedIn, isUserConfirmed, router, dispatch]);

	return (
		<>
			<Head>
				<title>{translation?.["sign_in_form.sign_in_button"]}</title>
			</Head>
			<Box width={["auto", 410]} p={[2.5, 3]}>
				<Typography mb={2} variant="h2">
					{translation?.["sign_in_form.sign_in_button"]}
				</Typography>
				<Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
					<Typography>{translation?.["sign_in_form.hint"]} </Typography>
					<Button
						variant="subaction-button"
						onClick={() => dispatch(openModal(MODAL_TYPES.REG_MODAL))}
					>
						{translation?.["sign_in_form.create_account_button"]}
					</Button>
				</Box>
				<StepComponent
					register={register}
					errors={errors}
					handleSubmit={handleSubmit(onSubmitHandler)}
					handleContinue={handleContinue}
					responseGoogle={responseGoogle}
					responseFacebook={responseFacebook}
				/>
			</Box>
		</>
	);
};

export default LoginView;
