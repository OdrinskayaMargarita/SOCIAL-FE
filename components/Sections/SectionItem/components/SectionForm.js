import React from "react";
import styled from "@emotion/styled";

const FormContainer = styled.div`
	padding-top: 20px;
`;

const FieldCol = ({ children }) => <div className="col">{children}</div>;

const SectionForm = ({ children }) => (
	<FormContainer>
		<form>
			<div className="row">{children}</div>
		</form>
	</FormContainer>
);

SectionForm.Field = FieldCol;

export default SectionForm;
