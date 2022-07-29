import React from "react";
import { Typography } from "@material-ui/core";

const ErrorMessage = ({ children }) => {
	return (
		<Typography color="red" mt={1}>
			{children}
		</Typography>
	);
};

export default ErrorMessage;
