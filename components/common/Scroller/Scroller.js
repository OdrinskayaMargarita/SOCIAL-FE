import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Scroller = ({
	items = [],
	component: ItemComponent,
	next,
	hasMore = true,
	target,
	userId,
	isLoading,
	isFeedComponent,
}) => {
	return (
		<>
			<InfiniteScroll
				dataLength={items.length}
				hasMore={hasMore}
				next={next}
				scrollableTarget={target}
				loader={<h4>Loading...</h4>}
			>
				{items.map((item, index) => (
					<ItemComponent {...item} isFeedComponent={isFeedComponent} key={index} userId={userId} />
				))}
			</InfiniteScroll>
		</>
	);
};

export default Scroller;
