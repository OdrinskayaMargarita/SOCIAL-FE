import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	updateArticle as editArticle,
	getArticle as getArticleThunk,
	createArticle as createArticleThunk,
} from "store/thunks/articles.thunks";

const useArticle = () => {
	const article = useSelector((state) => state.articles.data.itself);
	const dispatch = useDispatch();
	const updateArticle = useCallback(
		(data) => {
			return dispatch(editArticle(data));
		},
		[dispatch],
	);

	const getArticle = useCallback(
		(articleId) => {
			dispatch(getArticleThunk(articleId));
		},
		[dispatch],
	);

	const createArticle = useCallback(
		(data) => {
			return dispatch(createArticleThunk(data));
		},
		[dispatch],
	);

	return {
		article,
		updateArticle,
		getArticle,
		createArticle,
	};
};

export default useArticle;
