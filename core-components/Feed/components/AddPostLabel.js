import React from "react";
import Avatar from "core-components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";

import { MODAL_TYPES } from "core-components/Modal/constants";
import { openModal } from "store/reducers/app.reducer";

export const AddPostLabel = () => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	return (
		<Stack
			direction="row"
			spacing={[1.5, 2]}
			onClickCapture={() => dispatch(openModal(MODAL_TYPES.CREATE_POST_MODAL))}
		>
			<Avatar
				src={user?.avatar?.url}
				firstName={user.firstname || ""}
				lastName={user.lastname || ""}
			/>
			<InputBase
				fullWidth
				readOnly
				placeholder={translation?.["myProfile.tabs.feed.whatsnewPlaceholder"]}
			/>
		</Stack>
	);
};
