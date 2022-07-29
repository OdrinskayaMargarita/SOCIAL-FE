import SmartFeedFooterCommon from "./FooterCommon";
import SmartFeedFooterSolution from "./FooterSolution";

const SmartFeedTypeFooter = (data) => {
	// eslint-disable-next-line react/destructuring-assignment
	switch (data.type) {
		case "POST":
			return SmartFeedFooterCommon(data);
		case "EVENT":
			return SmartFeedFooterCommon(data);
		case "VOTING":
			return SmartFeedFooterSolution(data);
		case "ARTICLE":
			return SmartFeedFooterCommon(data);
		default:
			return null;
	}
};

export default SmartFeedTypeFooter;
