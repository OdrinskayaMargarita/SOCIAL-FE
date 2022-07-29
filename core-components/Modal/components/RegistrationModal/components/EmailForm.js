import React from "react";
import { FACEBOOK_ID, GOOGLE_ID } from "env";
import { useTranslation } from "next-i18next";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import Translate from "core-components/Translate/Translate";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import GoogleIcon from "core-components/Icon/GoogleIcon";
import FacebookIcon from "core-components/Icon/FacebookIcon";

const SocialButtons = ({ onFacebookLogin, onGoogleLogin }) => {
	const { t } = useTranslation();

	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			{/* <FacebookLogin
				appId={FACEBOOK_ID}
				callback={onFacebookLogin}
				render={(renderProperties) => (
					<Button
						startIcon={<FacebookIcon />}
						variant="social-login"
						fullWidth
						onClick={renderProperties.onClick}
					>
						{t("auth.login.loginFacebook")}
					</Button>
				)}
			/> */}
			<GoogleLogin
				clientId={GOOGLE_ID}
				buttonText={t("auth.login.loginGoogle")}
				redirectUri="/"
				cookiePolicy="single_host_origin"
				onSuccess={onGoogleLogin}
				onFailure={onGoogleLogin}
				render={(renderProperties) => (
					<Button
						startIcon={<GoogleIcon />}
						variant="social-login"
						fullWidth
						onClick={renderProperties.onClick}
					>
						{t("auth.login.loginGoogle")}
					</Button>
				)}
			/>
			{/*
			<Button variant="social-login" fullWidth startIcon={<AppleIcon color="action" />}>
				{t("auth.login.loginApple")}
			</Button>
			*/}
		</Box>
	);
};

const EmailForm = ({ register, responseGoogle, responseFacebook, handleContinue, errors }) => {
	const { t } = useTranslation();

	const handleSubmit = (e) => {
		e.preventDefault();
		handleContinue();
	};
	return (
		<>
			<Box component="form" onSubmit={handleSubmit}>
				<TextField fullWidth type="email" placeholder="Email" required {...register("email")} />
				{errors?.email?.message && (
					<Alert severity="error" sx={{ my: 0.5 }}>
						<Translate string={errors.email.message} />
					</Alert>
				)}
				<Button fullWidth type="submit" sx={{ my: 3 }} variant="fat">
					{t("common.continue")}
				</Button>
			</Box>
			<Divider sx={{ mx: -3, mb: 2.5 }} />
			<SocialButtons onFacebookLogin={responseFacebook} onGoogleLogin={responseGoogle} />
		</>
	);
};

export default EmailForm;
