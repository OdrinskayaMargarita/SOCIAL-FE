import React from "react";
import { string, func } from "prop-types";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";

import Avatar from "core-components/Avatar";

const Comment = ({ imgSrc = null, author, placeholder = "", onKeydown, inputValue, onChange }) => {
	return (
		<Stack mt={2} direction="row" spacing={[1.5, 2]}>
			<Avatar
				src={imgSrc}
				firstName={author.firstname}
				lastName={author.lastname}
				isMember={author?.isMember}
			/>
			<InputBase
				placeholder={placeholder}
				fullWidth
				size="small"
				onChange={onChange}
				value={inputValue}
				onKeyDown={onKeydown}
			/>
		</Stack>
	);
};

Comment.propTypes = {
	imgSrc: string,
	placeholder: string,
	onKeydown: func,
};

export default Comment;
