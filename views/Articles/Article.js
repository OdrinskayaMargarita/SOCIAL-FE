import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { SmartFeed, SmartLayout } from "components";
import { Loading } from "components/common";
import { CommentsList } from "components/Comments/CommentsList";
import { getArticle } from "store/thunks/articles.thunks";
import CardMedia from "@mui/material/CardMedia";

import ItemHeader, { ItemHeaderBack } from "../../components/common/ItemHeader";

const Article = () => {
	const dispatch = useDispatch();
	const {
		query: { id },
	} = useRouter();

	const article = useSelector((state) => state.articles.data.itself);

	useEffect(() => {
		if (id !== undefined) {
			dispatch(getArticle(id));
		}
	}, [dispatch, id]);

	return (
		<SmartLayout>
			<Head>
				<title>{article?.name}</title>
			</Head>
			{article ? (
				<>
					<ItemHeader>
						<ItemHeaderBack tab="articles" />
					</ItemHeader>
					{article.content?.titleImage?.url && (
						<CardMedia
							component="img"
							image={article.content?.titleImage?.url}
							maxHeight="350"
							alt="image"
						/>
					)}
					<SmartFeed {...article} isVisibleCreateComment={false} isHideTitleImage />
					<CommentsList {...article} />
				</>
			) : (
				<Loading />
			)}
		</SmartLayout>
	);
};

export default Article;
