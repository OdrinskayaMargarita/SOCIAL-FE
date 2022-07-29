import React from "react";
import { Trans } from "next-i18next";
import * as yup from "yup";

import { PHONE_VALIDATION_PATTERN } from "store/constants/validation.constants";

const schema = yup.object().shape({
	firstname: yup.string().required(<Trans i18nKey="common.errors.firstNameRequired" />),
	lastname: yup.string().required(<Trans i18nKey="common.errors.lastNameRequired" />),
	email: yup
		.string()
		.email(<Trans i18nKey="common.errors.invalidEmail" />)
		.required(<Trans i18nKey="common.errors.emailRequired" />),
	phoneNumber: yup
		.string()
		.matches(PHONE_VALIDATION_PATTERN, <Trans i18nKey="common.errors.phoneNumberInvalid" />),
	patronymic: yup.string(),
});

export default schema;
