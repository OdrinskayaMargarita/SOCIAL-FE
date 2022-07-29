import React from "react";
import * as yup from "yup";

import Translate from "core-components/Translate/Translate";

const schema = yup.object().shape({
	email: yup.string().email("common.errors.invalidEmail").required("common.errors.emailRequired"),
	password: yup.string().required("common.errors.passwordRequired"),
	repeatPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], () => "create_account_form.password_mismatch_error"),
});

export default schema;
