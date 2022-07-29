import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";
import { OfertaTerms } from "../../../OfertaTerms.mock";
import { ControlsContainer, MembershipContainer } from "../../styled";

export const Application = ({ showNextStep }) => {
	const { translation } = useSelector((state) => state.app);

	return (
		<>
			<MembershipContainer staticHeight>
				<Typography mb={[2, 3]} variant="h2">
					{translation?.["become_a_member_form3.subtitle"]}
				</Typography>
				<Typography color="primary.lightblue">{OfertaTerms}</Typography>
			</MembershipContainer>
			<ControlsContainer>
				<Button fullWidth onClick={showNextStep} variant="fat">
					{translation?.["become_a_member_form1.continue_button"]}
				</Button>
			</ControlsContainer>
		</>
	);
};
