import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProposals, voteProposal } from "../../../store/thunks/proposals.thunk";
import { reset } from "../../../store/reducers/proposals.reducer";

const useProposals = () => {
	const dispatch = useDispatch();
	const { entities: proposals, hasMore } = useSelector((state) => state.proposals);
	const fetchProposals = useCallback(() => {
		dispatch(getProposals());
	});

	const votingProposal = useCallback((data) => {
		dispatch(voteProposal(data));
	});

	const resetProporsal = useCallback(() => {
		dispatch(reset());
	});
	return {
		fetchProposals,
		proposals,
		hasMore,
		resetProporsal,
		votingProposal,
	};
};

export default useProposals;
