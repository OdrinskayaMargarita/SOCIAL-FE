import React, { useEffect, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { SectionItem, SmartLayout } from "components";
import { Loading } from "components/common";
import { CommentsList } from "components/Comments/CommentsList";
import { VOTING_STATUSES } from "store/constants/solutions.contants";
import { getSolutionData } from "../../store/thunks/solutions.thunks";
import { SmartFeedAuthor, SmartFeedTypeFooter } from "../../components/smart/SmartFeed/components";
import { SolutionHeader } from "./SolutionHeader";
import ItemHeader, { ItemHeaderBack } from "../../components/common/ItemHeader";
import { FindSolution } from "./components/FindSolution";
import { SuccessSolution } from "./components/Success";
import { Voting } from "./components/Voting";
import { FailedSolution } from "./components/FailedSolution";

const SolutionView = () => {
	const dispatch = useDispatch();
	const {
		query: { id },
	} = useRouter();

	const solution = useSelector((state) => state.solutions.data.itself);

	const renderContent = useMemo(() => {
		switch (solution?.content?.status) {
			case VOTING_STATUSES.PROPOSING:
				return <FindSolution {...solution} />;
			case VOTING_STATUSES.PROGRESS:
				return <Voting {...solution} />;
			case VOTING_STATUSES.FOUND:
				return <SuccessSolution {...solution} />;
			case VOTING_STATUSES.NOT_FOUND:
				return <FailedSolution {...solution} />;
			default:
				return <></>;
		}
	}, [solution]);

	useEffect(() => {
		if (id !== undefined) dispatch(getSolutionData(id));
	}, [dispatch, id]);

	return (
		<SmartLayout>
			<Head>
				<title>{solution?.name}</title>
			</Head>
			{solution ? (
				<>
					<ItemHeader>
						<ItemHeaderBack tab="solutions" />
					</ItemHeader>
					<SectionItem>
						<SmartFeedAuthor {...solution} />
						<SolutionHeader {...solution} />
						<SmartFeedTypeFooter {...solution} />
						{renderContent}
					</SectionItem>
					{solution.commentsTotal ? <CommentsList {...solution} /> : null}
				</>
			) : (
				<Loading />
			)}
		</SmartLayout>
	);
};

export default SolutionView;
