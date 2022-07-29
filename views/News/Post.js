import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { SmartFeed, SmartLayout } from "components";
import { Loading } from "components/common";
import { CommentsList } from "components/Comments/CommentsList";

import styled from "@emotion/styled";

import ItemHeader, { ItemHeaderBack } from "../../components/common/ItemHeader";
import { getPost } from "../../store/thunks/feed.thunks";

const Image = styled.img`
	width: 100%;
	height: 300px;
	margin-top: 16px;
`;

const Post = () => {
	const dispatch = useDispatch();
	const {
		query: { id },
	} = useRouter();

	useEffect(() => {
		if (id !== undefined) {
			dispatch(getPost(id));
		}
	}, [dispatch, id]);

	const feed = useSelector((state) => state?.feed?.data?.itself);
	return (
		<SmartLayout>
			<Head>
				<title>{feed?.name}</title>
			</Head>
			{feed ? (
				<>
					<ItemHeader>
						<ItemHeaderBack tab="news" />
					</ItemHeader>
					{feed.content?.titleImage?.url && (
						<Image src={feed.content?.titleImage?.url} alt="image" />
					)}
					<SmartFeed {...feed} isVisibleCreateComment={false} />
					<CommentsList {...feed} />
				</>
			) : (
				<Loading />
			)}
		</SmartLayout>
	);
};

export default Post;
