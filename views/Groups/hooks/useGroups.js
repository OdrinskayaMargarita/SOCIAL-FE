import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChangeGroupApplicantRole } from "store/thunks/group.thunks";

const useGroups = () => {
	const dispatch = useDispatch();
	const { itself: group } = useSelector((state) => state.group.data);

	const changeApplicatRole = useCallback(
		(data) => {
			return dispatch(onChangeGroupApplicantRole(data));
		},
		[dispatch],
	);

	return {
		changeApplicatRole,
		group,
	};
};

export default useGroups;
