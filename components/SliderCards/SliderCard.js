import React from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { node, oneOf } from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const SliderCardStyled = styled.div`
	width: 324px;
	background-color: #fff;
	border-radius: 20px;
	border: 1px solid rgba(109, 144, 155, 0.3);
	box-shadow: 0px 5px 10px rgba(58, 143, 173, 0.05), 0px 1px 2px rgba(58, 143, 173, 0.1);
	padding: 84px 20px 20px;
	background-image: url(${(props) => props.backgroundImage});
	background-size: 100% 108px;
	background-repeat: no-repeat;
	background-position: center top;
	cursor: pointer;
`;

const SliderCardImage = ({ logoImage }) => {
	return (
		<Avatar src={logoImage} sx={{ border: "3px solid #fff", width: 48, height: 48, mb: 1.5 }} />
	);
};

const SliderCardTitle = ({ children }) => (
	<Typography fontWeight="fontWeightMedium">{children}</Typography>
);

const SliderCardMeta = ({ users, posts }) => (
	<Box color="primary.lightblue" display="flex" mb={3} alignItems="center">
		<Box display="flex" alignItems="center" gap="2px">
			<PersonOutlinedIcon fontSize="12" />
			<Typography>{users}</Typography>
		</Box>
		<FiberManualRecordIcon sx={{ width: 4, height: 4, m: "0 2px", margin: "0 5px" }} />
		<Box display="flex" alignItems="center" gap="2px">
			<ArticleOutlinedIcon fontSize="12" />
			<Typography>{posts}</Typography>
		</Box>
	</Box>
);

const SliderCardAction = ({ children, ...props }) => (
	<Button variant="secondary" fullWidth {...props}>
		{children}
	</Button>
);

const SliderCard = ({ type = "group", backgroundImage, children, onClick }) => (
	<SliderCardStyled backgroundImage={backgroundImage} onClick={onClick}>
		{children}
	</SliderCardStyled>
);

SliderCard.Image = SliderCardImage;
SliderCard.Title = SliderCardTitle;
SliderCard.Meta = SliderCardMeta;
SliderCard.Action = SliderCardAction;

SliderCard.propTypes = {
	type: oneOf(["group", "user"]).isRequired,
	children: node.isRequired,
};

export default SliderCard;
