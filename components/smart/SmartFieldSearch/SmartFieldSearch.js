import React from "react";
import { string } from "prop-types";
import { InputAdornment, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";

const SmartFieldSearch = ({ placeholder = "", ...props }) => {
	const { translation } = useSelector((state) => state.app);
	return (
		<InputBase
			size="small"
			type="text"
			required
			fullWidth
			placeholder={placeholder || translation?.["global.search"]}
			{...props}
			startAdornment={
				<InputAdornment position="start">
					<SearchIcon />
				</InputAdornment>
			}
		/>
	);
};

SmartFieldSearch.propTypes = {
	placeholder: string,
};

export default SmartFieldSearch;
