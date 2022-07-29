import React from "react";
import styled from "@emotion/styled";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "store/reducers/app.reducer";

import EN from "../../styles/assets/images/en.png";
import UA from "../../styles/assets/images/ua.png";
import RU from "../../styles/assets/images/ru.png";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
	margin: 16px 20px;
	&& .MuiToggleButtonGroup-grouped {
		border-radius: 50%;
		border: 2px solid transparent;
		padding: 4px;
		margin: 0px 4px;
		&.Mui-selected {
			border-color: ${({ theme }) => theme.palette.primary.brand};
		}
	}
`;

const LANGUAGE_LIST = [
	{
		id: "EN",
		name: "English",
		image: EN.src,
	},
	{
		id: "UA",
		name: "Українська",
		image: UA.src,
	},
	{
		id: "RU",
		name: "Русский",
		image: RU.src,
	},
];

const ChangeLanguage = ({ demoMode }) => {
	const { currentLanguage } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	return demoMode ? (
		<Box
			component="img"
			alt="Language"
			src={LANGUAGE_LIST.find(({ id }) => id === currentLanguage)?.image}
		/>
	) : (
		<StyledToggleButtonGroup
			color="primary"
			value={currentLanguage}
			exclusive
			onChange={(_, pickedLang) => pickedLang && dispatch(changeLanguage(pickedLang))}
		>
			{LANGUAGE_LIST.map((language) => (
				<ToggleButton key={language.id} value={language.id} aria-label={language.name}>
					<Box component="img" alt={language.name} src={language.image} />
				</ToggleButton>
			))}
		</StyledToggleButtonGroup>
	);
};

export default ChangeLanguage;
