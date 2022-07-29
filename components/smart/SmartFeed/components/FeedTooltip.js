import { Box, MenuItem, MenuList, Tooltip, ClickAwayListener } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const FeedTooltip = ({ type, id }) => {
	const [open, setOpen] = useState(false);
	const { translation } = useSelector((state) => state.app);
	const router = useRouter();
	// TODO: add others types feed when will be implementing
	const PATH = {
		ARTICLE: `/social/articles/edit/${id}`,
	};

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};
	return (
		<ClickAwayListener onClickAway={handleTooltipClose}>
			<Tooltip
				placement="bottom-end"
				componentsProps={{
					tooltip: {
						sx: {
							border: "1px solid rgba(109, 144, 155, 0.3)",
							backgroundColor: "#fff",
							color: "#000",
							width: "200px",
							borderRadius: "8px",
						},
					},
				}}
				disableFocusListener
				disableHoverListener
				disableTouchListener
				open={open}
				onClose={handleTooltipClose}
				title={
					<Box>
						<MenuList>
							<MenuItem onClick={() => router.push(PATH[type])}>
								{translation?.["article_menu.edit_button"]}
							</MenuItem>
							<MenuItem>{translation?.["article_menu.delete_button"]}</MenuItem>
						</MenuList>
					</Box>
				}
			>
				<MoreHorizIcon sx={{ cursor: "pointer" }} onClick={handleTooltipOpen} />
			</Tooltip>
		</ClickAwayListener>
	);
};

export default FeedTooltip;
