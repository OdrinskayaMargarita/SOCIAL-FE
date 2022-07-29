import React from "react";
import { bool, node, oneOf, string } from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ButtonUpload = ({ children, ...props }) => <Button {...props}>{children}</Button>;

const ItemHeaderImage = ({
	type,
	src = "",
	hint = "",
	member = "",
	children,
	isEditable,
	buttonsBlock = false,
}) => (
	<>
		{type === "group" && (
			<Box
				sx={{
					height: [132, 300],
					marginLeft: -2,
					marginRight: -2,
					position: "relative",
				}}
			>
				{isEditable ? (
					<>
						<img src={src} alt="" style={{ objectFit: "cover" }} width="100%" height="100%" />
						{children}
					</>
				) : (
					<img src={src} alt="" style={{ objectFit: "cover" }} width="100%" height="100%" />
				)}
			</Box>
		)}
		{/* {!!buttonsBlock && children} */}
	</>
);

ItemHeaderImage.propTypes = {
	type: oneOf(["profile", "group"]).isRequired,
	src: string,
	hint: string,
	member: oneOf(["member", "cooperator"]),
	children: node,
};

ItemHeaderImage.ButtonUpload = ButtonUpload;

export default ItemHeaderImage;
