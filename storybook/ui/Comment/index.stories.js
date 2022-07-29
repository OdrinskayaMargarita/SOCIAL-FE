import React from "react";

import Comment from "components/Comment";

export default {
	title: "UI/Comment",
};

export const Default = () => {
	return <Comment imgSrc="https://picsum.photos/150" placeholder="Write a comment..." />;
};
