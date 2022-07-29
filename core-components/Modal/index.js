import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { closeModal } from "store/reducers/app.reducer";

import { MODAL_COMPONENTS } from "./constants";

const ModalComponent = () => {
	const { isModalOpen, modalType } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	const ModalContentComponent = MODAL_COMPONENTS[modalType];

	return (
		<Modal onClose={() => dispatch(closeModal())} open={isModalOpen}>
			<Box mx={[2, 0]} width={["100%", "auto"]} bgcolor="background.default">
				<ModalContentComponent />
			</Box>
		</Modal>
	);
};

export default ModalComponent;
