import React from "react";
import moment from "moment";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Message = ({ createTimestamp, text, isOwn, id, sendJsonMessage, attachment }) => {
	const timestamp = moment.unix(createTimestamp).locale("en").format();
	const today = moment().format("DD.MM.YYYY");

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: !isOwn ? "row" : "row-reverse",
				mb: 3,
			}}
		>
			<Box
				sx={{
					backgroundColor: isOwn ? "primary.brand" : "primary.lightGray",
					borderRadius: "16px",
					overflow: "hidden",
					px: !attachment ? 2 : 0,
					py: !attachment ? 1 : 0,
					maxWidth: "60%",
				}}
			>
				{attachment ? (
					<Box
						component="img"
						sx={{ objectFit: "cover", width: "100%", height: "100%" }}
						src={attachment?.url}
						alt={attachment?.original_name}
					/>
				) : (
					<Typography color={!isOwn ? "primary.dark" : "primary.light"}>{text}</Typography>
				)}
			</Box>
			<Typography color="primary.lightblue" mx={2} mt={1}>
				{moment(timestamp).format("DD.MM.YYYY") === today
					? moment(timestamp).format("HH:mm")
					: moment(timestamp).format("DD.MM.YYYY")}
			</Typography>
		</Box>
	);
};

export default Message;
