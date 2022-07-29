import React, { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import ImagesGallery from "core-components/ImagesGallery/ImagesGallery";
import { EventHeader } from "./EventHeader";
import { FeedContent, FeedWysiwyg, FeedImages } from ".";

const FeedContentEvent = (data) => {
	const [isOpenImagesGallery, setIsOpenImagesGallery] = useState(false);
	const { id, content } = data;
	const { images } = content;
	const router = useRouter();
	const isFeedDetails = Boolean(router?.query?.id && router.route === "/social/events/[id]");
	const toggleGallery = (e) => {
		e.stopPropagation();
		setIsOpenImagesGallery(!isOpenImagesGallery);
	};

	return (
		<FeedContent>
			<Box
				sx={{
					cursor: isFeedDetails ? "inherit" : "pointer",
				}}
				onClick={() => (isFeedDetails ? null : router.push(`/social/events/${id}`))}
			>
				<EventHeader content={content} />
				<FeedWysiwyg>{content.content}</FeedWysiwyg>
				{images.length > 0 && isFeedDetails ? (
					<FeedImages toggleGallery={toggleGallery} images={images} />
				) : null}
			</Box>
			<ImagesGallery
				isOpen={isOpenImagesGallery}
				onClose={toggleGallery}
				gallery={images}
				data={data}
			/>
		</FeedContent>
	);
};

export default FeedContentEvent;
