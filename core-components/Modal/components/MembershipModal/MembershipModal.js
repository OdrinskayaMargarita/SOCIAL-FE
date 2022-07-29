import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";

import { openModal } from "store/reducers/app.reducer";
import { MODAL_TYPES } from "core-components/Modal/constants";
import {
	SendCode,
	Oferta,
	PersonalData,
	Application,
	ModalHeading,
	Payment,
	SuccessPayment,
} from "./Steps";

const MembershipModal = () => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const [step, setStep] = useState(0);
	const showNextStep = () => setStep((currentStep) => currentStep + 1);
	const showPrevStep = () => setStep((currentStep) => currentStep - 1);
	const StepComponent = useMemo(
		() => [Oferta, PersonalData, Application, SendCode, Payment, SuccessPayment, () => <></>][step],
		[step],
	);

	useEffect(() => {
		if (!isLoggedIn) {
			dispatch(openModal(MODAL_TYPES.LOGIN_MODAL));
		}
	}, [dispatch]);

	return (
		<Box width={["auto", 728]}>
			<Head>
				<title>{translation?.["become_a_member_form1.title"]}</title>
			</Head>
			{step !== 5 ? (
				<ModalHeading step={step} showNextStep={showNextStep} showPrevStep={showPrevStep} />
			) : null}
			<StepComponent {...{ showNextStep, showPrevStep }} />
		</Box>
	);
};

export default MembershipModal;
