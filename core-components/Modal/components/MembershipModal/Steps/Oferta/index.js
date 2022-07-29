import React, { useState } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { OfertaTerms } from "../../../OfertaTerms.mock";
import { ControlsContainer, MembershipContainer } from "../../styled";

export const Oferta = ({ showNextStep }) => {
	const { translation } = useSelector((state) => state.app);
	const [isChecked, setIsChecked] = useState(false);
	const toggleIsChecked = () => setIsChecked((prevChecked) => !prevChecked);

	return (
		<>
			<MembershipContainer staticHeight>
				<Typography mb={[2, 3]} variant="h2">
					{translation?.["become_a_member_form1.subtitle"]}
				</Typography>
				<Typography color="primary.lightblue">{OfertaTerms}</Typography>
			</MembershipContainer>
			<ControlsContainer>
				<Box mb={[1, 2.5]} mt={[-1.5, 0]}>
					<FormControlLabel
						control={<Checkbox onChange={toggleIsChecked} checked={isChecked} />}
						label={translation?.["become_a_member_form1.checkbox_text"]}
					/>
				</Box>
				<Button fullWidth variant="fat" disabled={!isChecked} onClick={showNextStep}>
					{translation?.["become_a_member_form1.continue_button"]}
				</Button>
			</ControlsContainer>
		</>
	);
};
