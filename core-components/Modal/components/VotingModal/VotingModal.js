import React, { useState } from "react";
import Button from "@mui/material/Button";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "store/reducers/app.reducer";
import { getSolutionData, voteThunk } from "store/thunks/solutions.thunks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DraggableList from "../../../../views/Solutions/components/DragVotingList";

const VotingModal = () => {
	const dispatch = useDispatch();
	const { translation } = useSelector((state) => state.app);
	const [title, setTitle] = useState("");

	const solution = useSelector((state) => {
		return state.solutions.data.itself;
	});

	const {
		content: { solutions, description },
		id,
	} = solution;

	const [items, setItems] = useState(solutions);

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	const onDragEnd = ({ destination, source }) => {
		if (!destination) return;
		const newItems = reorder(items, source.index, destination.index);
		setItems(newItems);
	};

	const onCloseModal = ($event) => {
		if ($event.target.className.includes("voting-modal-wrapper")) {
			dispatch(closeModal());
		}
	};

	const onCloseByButton = ($event) => {
		dispatch(closeModal());
	};

	const vote = async () => {
		const {
			payload: { success },
		} = await dispatch(voteThunk({ items, id }));

		if (success) {
			dispatch(getSolutionData(id));
			dispatch(closeModal());
		}
	};

	return (
		<Box
			p={6}
			width={728}
			position="relative"
			onClickCapture={onCloseModal}
			sx={{ position: "relative" }}
		>
			<CloseOutlinedIcon
				fontSize="small"
				onClickCapture={onCloseByButton}
				sx={{ position: "absolute", top: "20px", right: "20px" }}
			/>
			<Grid container spacing={1} alignItems="center" mb={2}>
				<Grid item color="#3B59F5">
					<AssessmentOutlinedIcon fontSize="8px" color="#3B59F5" mt={1} />
				</Grid>
				<Grid item>
					<Typography color="#3B59F5">{translation?.["voting_form.title"]}</Typography>
				</Grid>
			</Grid>
			<Typography variant="h2" mb={2}>
				{description}
			</Typography>
			<Typography color="#748893" fontSize="13px" mb={4}>
				Распределите варианты решений в порядке своего предпочтения, где 1 — самый предпочтительный
				вариант. Просто перетащите мышкой нужный вариант в соответствующую ячейку.
			</Typography>
			<DraggableList items={items} onDragEnd={onDragEnd} />
			<Box
				sx={{ borderTop: "1px solid rgba(109, 144, 155, 0.2)", width: "calc(100% + 96px)" }}
				mt={6}
				ml={-6}
				pt={4}
				px={6}
			>
				<Button onClick={vote} fullWidth>
					{translation?.["voting_form.save_my_vote"]}
				</Button>
			</Box>
		</Box>
	);
};

export default VotingModal;
