import { Box } from "@mui/material";
import ImagesGallery from "core-components/ImagesGallery/ImagesGallery";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FeedImages, FeedContent, FeedWysiwyg } from ".";
import { parsePostData } from "../../../utils/feed.utils";

const FeedContentPost = (data) => {
	const [isOpenImagesGallery, setIsOpenImagesGallery] = useState(false);
	const { text, id } = parsePostData(data);
	const { content } = data;
	const gallery = content?.images.length > 0 ? content?.images : null;
	const router = useRouter();
	const isFeedDetails = Boolean(router?.query?.id && router.route === "/social/post/[id]");
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
				onClick={isFeedDetails ? undefined : () => router.push(`/social/post/${id}`)}
			>
				<FeedWysiwyg>{text}</FeedWysiwyg>
				{gallery?.length > 0 ? <FeedImages images={gallery} toggleGallery={toggleGallery} /> : null}
			</Box>
			<ImagesGallery
				isOpen={isOpenImagesGallery}
				onClose={toggleGallery}
				gallery={gallery}
				data={data}
			/>
		</FeedContent>
	);
};

export default FeedContentPost;
