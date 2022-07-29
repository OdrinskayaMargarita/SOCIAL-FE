import React from "react";
import * as yup from "yup";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("create_account_form.email_valid_error")
		.required("create_account_form.email_is_required_error"),
	firstname: yup.string().required("create_account_form.name_is_required_error"),
	lastname: yup.string().required("create_account_form.second_name_is_required_error"),
	password: yup
		.string()
		.required("create_account_form.password_is_required_error")
		.matches(
			/^(?=.*[0-9])(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[@#$%^&!?~:;<>{}(),+=.\-_*])([A-zА-я0-9@#$%^&!?~:;<>{}(),+=*.\-_]){8,}$/,
			() => "create_account_form.password_hint",
		),
	repeatPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], () => "create_account_form.password_mismatch_error"),
});

export default schema;
