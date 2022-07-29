import { API_URL } from "env";
import { getOr } from "lodash/fp";
import get from "lodash/fp/get";
import omit from "lodash/fp/omit";
import moment from "moment";

import { normalizeUserData } from "./users.utils";

const normalizePostContent = (postContent) => {
	const concatApiToString = (string) => `${API_URL}${string}`;
	return postContent?.images?.map((image) => {
		return { ...image, url: concatApiToString(image.url) };
	});
};

const normalizeImages = (images) => {
	const concatApiToString = (string) => `${API_URL}${string}`;
	return images.map((image) => {
		return { ...image, url: concatApiToString(image.url) };
	});
};

const normalizeImage = (image) => {
	if (!image) return {};
	const concatApiToString = (string) => `${API_URL}${string}`;
	return { ...image, url: concatApiToString(image.url) };
};

const normalizeComment = (comment) => {
	if (!comment) return {};
	const author = normalizeUserData(get("author", comment));
	const idUser = get("id_user", comment);
	const createDate = get("create_timestamp", comment);
	const normalizedComment = {
		...comment,
		idUser,
		createDate,
		author,
	};
	return omit([idUser, "create_timestamp", "id_user"], normalizedComment);
};

export const normalizeComments = (data = []) => {
	return data.map((comment) => normalizeComment(comment));
};

export const normalizeSolution = (solution) => {
	if (!solution) return {};
	const author = normalizeUserData(get("author", solution));
	const createTimestamp = get("create_timestamp", solution);

	const isWinner = get("is_winner", solution);
	const id = get("id", solution).toString();
	const normalizedSolution = {
		...solution,
		createTimestamp,
		isWinner,
		author,
		id,
	};
	return omit(["create_timestamp, is_winner"], normalizedSolution);
};

export const normalizeSolutions = (data = []) => {
	return data.map((solution) => normalizeSolution(solution));
};

export const normalizeContent = (content) => {
	if (!content) return {};
	const titleImage = normalizeImage(get("title_image", content));
	const startTimestamp = get("start_timestamp", content);
	const endTimestamp = get("end_timestamp", content);
	const userVotingResult = getOr(null, "user_voting_result", content);
	let solutions = normalizeSolutions(get("solutions", content));
	const images = normalizeImages(getOr([], "images", content));
	let isUserVote = false;
	if (userVotingResult) {
		isUserVote = true;
		const modifiedSolutions = [];
		userVotingResult.forEach((userVote) => {
			modifiedSolutions.push(solutions.find((sol) => +sol.id === +userVote));
		});
		solutions = [...modifiedSolutions];
	}

	const normalizedContent = {
		...content,
		titleImage,
		startTimestamp,
		endTimestamp,
		solutions,
		isUserVote,
		images,
		userVotingResult,
	};
	return omit(["title_image", "start_timestamp", "end_timestamp"], normalizedContent);
};

export const normalizeFeedData = (feed) => {
	if (!feed) return {};
	const author = normalizeUserData(get("author", feed));
	const contentKey = `${get("type", feed)?.toLowerCase()}_content`;
	const content = normalizeContent(get(contentKey, feed));
	const postedTo = get("posted_to", feed);
	const createDate = get("create_timestamp", feed);
	const updateDate = get("update_timestamp", feed);
	const commentsTotal = get("comments_total", feed);
	const isLiked = get("is_liked", feed);
	const likes = get("likes", feed);
	const postContent = normalizePostContent(get("post_content", feed));
	const comments = normalizeComments(get("comments", feed));
	const isUpdated = updateDate > createDate;
	const normalizedFeed = {
		...feed,
		content,
		postedTo,
		createDate,
		updateDate,
		isUpdated,
		isLiked,
		postContent,
		comments,
		commentsTotal,
		author,
		likes,
	};

	return omit(
		[
			contentKey,
			"posted_to",
			"create_timestamp",
			"comments_total",
			"update_timestamp",
			"post_content",
		],
		normalizedFeed,
	);
};

export const normalizeFeedsData = (data = []) => data.map((feed) => normalizeFeedData(feed));

export const parsePostData = ({ id, content: { text, images }, ...rest }) => {
	const startDate = get("start_timestamp", rest);
	return {
		startDate: moment(startDate).format(),
		id,
		text,
		images: normalizeImages(images),
	};
};

export const parseArticleData = ({ id, content: { content }, ...rest }) => {
	const startDate = get("start_timestamp", rest);
	return {
		...rest,
		startDate: moment(startDate).format(),
		id,
		content,
	};
};

export const parseEventData = ({ id, content: { content }, ...rest }) => {
	const startDate = get("start_timestamp", rest);
	return {
		startDate: moment(startDate).format(),
		id,
		content,
	};
};

export const parseVotingData = ({ id, content: { name, description, status }, ...rest }) => {
	const startDate = get("start_timestamp", rest);
	const endDate = get("end_timestamp", rest);
	return {
		id,
		name,
		description,
		status,
		startDate: moment(startDate).format(),
		endDate: moment(endDate).format(),
	};
};
