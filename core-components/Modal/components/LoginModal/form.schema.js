import React from "react";
import * as yup from "yup";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("sign_in_form.email_valid_error")
		.required("sign_in_form.email_is_required_error"),
	password: yup.string().required("sign_in_form.password_is_required_error"),
});

export default schema;
