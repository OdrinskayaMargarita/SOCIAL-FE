import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const MembershipContainer = styled(Box)`
	padding: 40px 64px 40px;
	height: ${(props) => (props.staticHeight ? "423px" : "auto")};
	overflow-y: auto;
	border-bottom: 1px solid #e1e9eb;

	${({ theme }) => theme.breakpoints.down("md")} {
		padding: 20px 24px;
	}
`;
export const ControlsContainer = styled(Box)`
	padding: 20px 64px 24px;

	${({ theme }) => theme.breakpoints.down("md")} {
		padding: 20px 24px;
	}
`;
