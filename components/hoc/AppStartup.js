import React, { useEffect } from "react";
import { node } from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import Loading from "components/common/Loading";
import { fetchUserProfile, getTranslations } from "store/thunks/auth.thunks";
import { startUp } from "store/reducers/app.reducer";
import ModalComponent from "core-components/Modal";

const AppStartup = ({ children }) => {
	const dispatch = useDispatch();
	const isInitialLoaded = useSelector((state) => state.app.isInitialLoaded);

	useEffect(() => {
		const fetchData = async () => {
			await dispatch(fetchUserProfile());
			await dispatch(getTranslations());
			dispatch(startUp());
		};
		fetchData();
	}, [dispatch]);

	return (
		<>
			{isInitialLoaded ? children : <Loading />}
			<ModalComponent />
		</>
	);
};

AppStartup.propTypes = {
	children: node.isRequired,
};

export default AppStartup;
