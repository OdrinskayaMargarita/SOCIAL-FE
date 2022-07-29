import * as React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DragItem from "./DragItem";

const DraggableList = React.memo(({ items, onDragEnd }) => {
	return (
		<Grid container justifyContent="space-between">
			<Grid item container direction="column" xs={1} justifyContent="space-around">
				{items.map((item, index) => (
					<Box mb={1} key={+item.id} sx={{ width: "50px" }}>
						<Typography fontSize="20px" fontWeight="600">
							{index + 1}
						</Typography>
					</Box>
				))}
			</Grid>
			<Grid item xs={11}>
				<DragDropContext onDragEnd={onDragEnd} style={{ width: "80%" }}>
					<Droppable droppableId="droppable-list">
						{(provided) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								{items.map((item, index) => (
									<DragItem item={item} index={index} key={+item.id} />
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</Grid>
		</Grid>

		// <DragDropContext onDragEnd={onDragEnd}>
		// 	<Droppable droppableId="droppable-list">
		// 		{(provided) => (
		// 			<div ref={provided.innerRef} {...provided.droppableProps}>
		// 				{items.map((item, index) => (
		// 					<Grid container alignItems="center" key={index} mb={1}>
		// 						<Grid item xs={1}>
		// 							<Typography fontSize="20px" fontWeight="600">
		// 								{index + 1}
		// 							</Typography>
		// 						</Grid>
		// 						<Grid item xs={11}>
		// 							<DragItem item={item} index={index} key={+item.id} />
		// 						</Grid>
		// 					</Grid>
		// 				))}
		// 				{provided.placeholder}
		// 			</div>
		// 		)}
		// 	</Droppable>
		// </DragDropContext>
	);
});

export default DraggableList;
