import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";

const baseTheme = createTheme();

// Create a theme instance.
const theme = createTheme({
	typography: {
		fontFamily: "Montserrat, Helvetica Neue, sans-serif",
		htmlFontSize: 16,
		h2: {
			fontSize: 24,
			[baseTheme.breakpoints.down("md")]: {
				fontSize: 20,
			},
			fontWeight: 600,
		},
		h3: {
			fontSize: 16,
			fontWeight: 600,
		},
		h4: {
			fontSize: 12,
			fontWeight: 500,
		},
		body1: {
			fontSize: 14,
		},
		body2: {
			fontSize: 14,
			fontWeight: 500,
		},
		bold: {
			fontWeight: 600,
		},
	},
	palette: {
		primary: {
			main: "#556cd6",
			brand: "#3b59f5",
			dark: "#141414",
			hover: grey[50],
			light: "#ffffff",
			lightblue: "#748893",
			lightgreen: "#00c8d5",
			success: "#26c03f",
			error: "#ff1744",
			lightGray: "rgba(116, 136, 147, 0.1)",
		},
		active: {
			main: "#0057FF",
		},
		action: {
			main: "#3A59F5",
		},
		black: {
			main: "#273437",
		},
		lightBlack: {
			main: "#171717",
		},
		grey: {
			main: "#696969",
		},
		secondary: {
			main: "#19857b",
		},
		blue: {
			main: "#3B59F5",
		},
		error: {
			main: red.A400,
		},
		green: {
			main: "#26BF3F",
		},
	},
	components: {
		MuiInputBase: {
			styleOverrides: {
				root: {
					fontSize: "14px",
					borderRadius: 8,
					background: "rgba(109, 144, 155, 0.1)",
				},
			},
			variants: [
				{
					props: {}, // Default variant props
					style: {
						"& .MuiInputBase-input": {
							padding: 0,
							lineHeight: "20px",
						},
						"& .MuiOutlinedInput-notchedOutline": {
							borderColor: "rgba(109, 144, 155, 0.1)",
						},
						"&": {
							padding: "11px 16px",
							[baseTheme.breakpoints.down("md")]: {
								padding: "8px 10px",
							},
							borderRadius: 12,
							borderColor: "rgba(109, 144, 155, 0.1)",
						},
					},
				},
				{
					props: { variant: "secure-code" },
					style: {
						"& .MuiInputBase-input": {
							textAlign: "center",
							padding: "0",
							width: "36px",
							[baseTheme.breakpoints.down("md")]: {
								width: "28px",
							},
						},
						"&": {
							padding: "16px 8px",
							[baseTheme.breakpoints.down("md")]: {
								padding: "9px 7px",
							},
						},
						background: "rgba(109, 144, 155, 0.1);",
						border: "1px solid #ccc",
						borderRadius: 8,
						color: "#161616",
						fontSize: 22,
						fontWeight: 600,
						lineHeight: 18,
						padding: "4px",
					},
				},
				{
					props: { variant: "white-input" },
					style: {
						background: "#fff",
						border: "1px solid #ccc",
						borderRadius: 8,
						color: "#161616",
						fontSize: "14px",
						padding: "4px",
					},
				},
			],
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: "13px",
					textTransform: "capitalize",
					padding: "10px 20px",
					fontWeight: 600,
					lineHeight: "16px",
					borderRadius: 8,
					fontFamily: "Montserrat",
				},
			},
			variants: [
				{
					props: {}, // Default button style
					style: {
						borderColor: "#3B59F5",
						color: "#fff",
						backgroundColor: "#3B59F5",
						"&:hover": {
							color: "#3B59F5",
						},
						"&:disabled": {
							color: "#fff",
							opacity: 0.3,
						},
					},
				},
				{
					props: { variant: "outlined" },
					style: {
						borderColor: "#3B59F5",
						color: "#3B59F5",
						backgroundColor: "#ffffff",
						borderWidth: "2px",
						"&:hover": {
							borderWidth: "2px",
							borderColor: "#3B59F5",
						},
					},
				},
				{
					props: { variant: "fat" },
					style: {
						padding: 18,
						fontSize: 15,
						[baseTheme.breakpoints.down("md")]: {
							padding: 13,
							fontSize: 13,
						},
					},
				},
				{
					props: { variant: "lightBlue" },
					style: {
						color: "#3b59f5",
						backgroundColor: "rgba(59, 89, 245, 0.08)",
						"&:disabled": {
							backgroundColor: "rgba(109, 144, 155, 0.1)",
							color: "#121212",
							opacity: 1,
						},
					},
				},
				{
					props: { variant: "lightBlueWithoutOpacity" },
					style: {
						color: "#3b59f5",
						backgroundColor: "#EFF2FE",
						"&:disabled": {
							backgroundColor: "rgba(109, 144, 155, 0.1)",
							color: "#121212",
							opacity: 1,
						},
						"&:hover": {
							backgroundColor: "rgba(255, 255, 255, 0.9)",
						},
					},
				},
				{
					props: { variant: "white" },
					style: {
						color: "#000000",
						backgroundColor: "#ffffff",
						border: "1px solid rgba(109, 144, 155, 0.3)",
					},
				},
				{
					props: { variant: "grey" },
					style: {
						color: "#000000",
						backgroundColor: "rgba(109, 144, 155, 0.1)",
					},
				},
				{
					props: { variant: "subaction-button" },
					style: {
						padding: 5,
						border: "none",
						background: "none",
						outline: "none",
						color: "#3b59f5",
						"&:hover": {
							background: "none",
						},
					},
				},
				{
					props: { variant: "social-black" },
					style: {
						padding: 5,
						border: "none",
						background: "none",
						outline: "none",
						color: "#000000",
						"&:hover": {
							background: "none",
						},
					},
				},
				{
					props: { variant: "social-login" },
					style: {
						padding: 10,
						border: "none",
						background: "none",
						outline: "none",
						color: "#000000",
						justifyContent: "left",
					},
				},
				{
					props: { variant: "lightGrey" },
					style: {
						fontStyle: "normal",
						fontSize: "13px",
						color: "#2B404B",
						background: "#F0F4F5",
						"&:disabled": {
							opacity: 1,
							color: "#121212",
						},
					},
				},
				{
					props: { variant: "lightGreyWithoutOpacity" },
					style: {
						fontStyle: "normal",
						fontSize: "13px",
						color: "#2B404B",
						background: "#F0F4F5",
						"&:hover": {
							background: "rgba(255, 255, 255, 0.8)",
						},
					},
				},
				{
					props: { variant: "lightGreyRounded" },
					style: {
						fontStyle: "normal",
						fontSize: "13px",
						color: "#2B404B",
						background: "#F0F4F5",
						borderRadius: "24px",
						padding: "11px 16px",
					},
				},
				{
					props: { variant: "containedRounded" },
					style: {
						fontStyle: "normal",
						fontWeight: 500,
						fontSize: "13px",
						color: "#FFFFFF",
						background: "#3B59F5",
						borderRadius: "24px",
						padding: "11px 16px",
					},
				},
				{
					props: { variant: "lightBlueRounded" },
					style: {
						color: "#3b59f5",
						borderRadius: "24px",
						backgroundColor: "rgba(59, 89, 245, 0.08)",
						"&:disabled": {
							backgroundColor: "rgba(109, 144, 155, 0.1)",
							color: "#121212",
							opacity: 1,
						},
					},
				},
			],
		},
		MuiModal: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					display: "flex",
					boxShadow: "0px 4px 8px rgba(17, 68, 97, 0.05), 0px 12px 20px rgba(80, 129, 146, 0.15)",
					alignItems: "center",
					justifyContent: "center",
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontFamily: "Montserrat",
					fontStyle: "normal",
					fontWeight: 400,
					fonSsize: "14px",
					lineHeight: "20px",
					color: "#748893",
					marginBottom: "8px",
				},
				asterisk: {
					color: "red",
				},
			},
		},
		MuiSwitch: {
			styleOverrides: {
				thumb: {
					width: 6,
					height: 6,
					borderRadius: "50%",
					transition: baseTheme.transitions.create(["width"], {
						duration: 200,
					}),
					backgroundColor: "#fff",
				},
				switchBase: {
					padding: 16,
				},
				track: {
					height: 16,
					backgroundColor: "grey",
					borderRadius: 31,
				},
			},
			variants: [
				{
					props: { variant: "greenProfile" },
					style: {
						"&.MuiSwitch-root": {
							height: "48px",
							width: "66px",
						},
						"&.MuiSwitch-switchBase.Mui-checked": {
							color: "#26BF3F",
						},
						".MuiSwitch-track": {
							opacity: "1",
							height: "100%",
						},
						".MuiSwitch-thumb": {
							width: "16px",
							height: "16px",
						},
						"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
							backgroundColor: "#26BF3F",
							opacity: 1,
							height: "24px",
						},
					},
				},
			],
		},
		MuiCard: {
			styleOverrides: {
				root: {
					padding: "0",
					boxShadow: "none",
					".MuiCardContent-root": {
						padding: "0",
					},
					".MuiCardMedia-root": {
						marginTop: "16px",
					},
				},
			},
		},
	},
});

export default theme;
