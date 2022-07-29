import React from "react";
import { string } from "prop-types";

const UserAvatar = ({ className = "", imgSrc, imgAlt = "" }) => (
	<div>
		<img src={imgSrc} alt={imgAlt} />
	</div>
);

UserAvatar.propTypes = {
	className: string,
	imgSrc: string.isRequired,
	imgAlt: string,
};

export default UserAvatar;
