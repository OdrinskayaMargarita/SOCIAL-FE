import ContentEvent from "./ContentEvent";
import ContentPost from "./ContentPost";
import ContentSolution from "./ContentSolution";
import ContentArticle from "./ContentArticle";

const FeedTypeContent = (data) => {
	// eslint-disable-next-line react/destructuring-assignment
	switch (data.type) {
		case "POST":
			return ContentPost(data);
		case "EVENT":
			return ContentEvent(data);
		case "VOTING":
			return ContentSolution(data);
		case "ARTICLE":
			return ContentArticle(data);
		default:
			return null;
	}
};

export default FeedTypeContent;
