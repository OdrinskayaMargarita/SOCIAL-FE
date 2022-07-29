import React from "react";
import { FACEBOOK_ID, GOOGLE_ID } from "env";
import { useDispatch, useSelector } from "react-redux";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Translate from "core-components/Translate/Translate";

import { openModal } from "store/reducers/app.reducer";
import { MODAL_TYPES } from "core-components/Modal/constants";
import GoogleIcon from "core-components/Icon/GoogleIcon";
import FacebookIcon from "core-components/Icon/FacebookIcon";

const SocialButtons = ({ onFacebookLogin, onGoogleLogin }) => {
	const { translation } = useSelector((state) => state.app);

	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			{/* <FacebookLogin
				appId={FACEBOOK_ID}
				callback={onFacebookLogin}
				render={(renderProperties) => (
					<Button
						startIcon={<FacebookIcon />}
						variant="social-login"
						sx={{ textTransform: "none" }}
						fullWidth
						onClick={renderProperties.onClick}
					>
						{translation?.["sign_in_form.continue_with_fb_button"]}
					</Button>
				)}
			/> */}
			<GoogleLogin
				clientId={GOOGLE_ID}
				redirectUri="/"
				cookiePolicy="single_host_origin"
				onSuccess={onGoogleLogin}
				onFailure={onGoogleLogin}
				render={(renderProperties) => (
					<Button
						startIcon={<GoogleIcon />}
						variant="social-login"
						sx={{ textTransform: "none" }}
						fullWidth
						onClick={renderProperties.onClick}
					>
						{translation?.["sign_in_form.continue_with_google_button"]}
					</Button>
				)}
			/>
		</Box>
	);
};

const EmailForm = ({ register, responseGoogle, responseFacebook, handleContinue, errors }) => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	return (
		<>
			<Box component="form" onSubmit={handleContinue}>
				<FormControl fullWidth variant="standard">
					{(errors?.email?.message || errors?.server?.message) && (
						<Alert severity="error" sx={{ my: 1, fontSize: "13px" }}>
							<Translate string={errors?.email?.message ?? errors?.server?.message} />
						</Alert>
					)}
					<TextField
						placeholder={translation?.["sign_in_form.email_hint"]}
						required
						{...register("email")}
					/>
				</FormControl>
				<Button
					variant="subaction-button"
					onClick={() => dispatch(openModal(MODAL_TYPES.FORGOT_PASS_MODAL))}
					sx={{ mt: 1.5, mb: 3 }}
				>
					{translation?.["sign_in_form.forgot_password_button"]}
				</Button>
				<Button fullWidth type="submit" sx={{ mb: 3 }} variant="fat">
					{translation?.["create_account_form.continue_button"]}
				</Button>
			</Box>
			<Divider sx={{ mx: -3, mb: 2.5 }} />
			<SocialButtons onGoogleLogin={responseGoogle} onFacebookLogin={responseFacebook} />
		</>
	);
};

export default EmailForm;
