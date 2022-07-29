import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";

import { groupTypes } from "store/constants/groups.constants";

export const EditFormGroup = ({ register, countries, groupType, countryId }) => {
	const { t } = useTranslation();
	const { translation } = useSelector((state) => state.app);
	return (
		<Stack sx={{ borderTop: 1, borderColor: "divider" }} spacing={2} p="20px">
			<Typography variant="h3" mb={3}>
				{translation["group.edit.main"]}
			</Typography>
			<FormControlLabel
				label={translation?.["group.edit.requests_to_join"]}
				control={
					<Switch
						variant="greenProfile"
						defaultChecked={groupType === groupTypes.PRIVATE}
						{...register("type")}
					/>
				}
			/>
			<InputLabel htmlFor="name">{translation["group.edit.name"]}</InputLabel>
			<InputBase id="name" {...register("name")} />
			<InputLabel htmlFor="country">{translation["group.edit.country"]}</InputLabel>
			<TextField
				select
				placeholder={t("group.createModal.placeholders.country")}
				defaultValue={countryId}
				{...register("country")}
			>
				{countries.map((option, idx) => (
					<MenuItem value={option.value} key={idx}>
						{option.text}
					</MenuItem>
				))}
			</TextField>
			<InputLabel htmlFor="city">{translation["group.edit.city"]}</InputLabel>
			<InputBase id="city" {...register("city")} />
			<InputLabel htmlFor="description">{translation["group.edit.description"]}</InputLabel>
			<InputBase id="description" {...register("description")} />
		</Stack>
	);
};
