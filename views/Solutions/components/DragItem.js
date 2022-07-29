import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Typography from "@mui/material/Typography";

const DraggableListItem = ({ item, index }) => {
	return (
		<Draggable draggableId={item.id} index={index}>
			{(provided, snapshot) => (
				<ListItem
					sx={{
						border: "1px solid rgba(116, 136, 147, 0.3)",
						borderRadius: "12px",
						padding: "16px 20px",
						justifyContent: "space-between",
						marginBottom: "8px",
					}}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Typography>{item?.name}</Typography>
					<ListItemIcon sx={{ minWidth: "initial" }}>
						<DragIndicatorIcon />
					</ListItemIcon>
				</ListItem>
			)}
		</Draggable>
	);
};

export default DraggableListItem;
