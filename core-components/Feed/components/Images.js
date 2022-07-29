import React from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

const StyledMainImage = styled.image`
	margin-top: 20px;
	img {
		width: 100%;
	}
`;

const FeedImagesWrap = styled.div`
	margin-top: 20px;
	width: 100%;
`;

const VerticalImageItem = styled.div`
	width: 100%;
	position: relative;
	height: 100%;
`;

const VerticalSecondImageBackgroundImage = styled.div`
	display: block;
	height: 100%;
	width: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: ${(props) => `url(${props.imageSrc})`};
`;

const HasMore = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	font-size: 24px;
	text-align: center;
	color: #ffffff;
	background-color: rgba(0, 0, 0, 0.5);
`;

const MainImage = ({ image, onToggleGallery }) => (
	<StyledMainImage onClick={onToggleGallery}>
		<img src={image.url} alt={image.filename} />
	</StyledMainImage>
);

const VerticalImage = ({ image, verticalLength, onToggleGallery, hasMore = 0, ...props }) => (
	<Grid item xs={12}>
		<VerticalImageItem onClick={onToggleGallery} {...props}>
			<VerticalSecondImageBackgroundImage imageSrc={image.url} />
			{hasMore ? <HasMore>+{hasMore}</HasMore> : null}
		</VerticalImageItem>
	</Grid>
);

const FeedImages = ({ images, toggleGallery }) => {
	const imagesLength = images.length;
	const cols = imagesLength === 1 ? 1 : 2;
	const secondColMaxImages = 3;
	const secondColImagesLength =
		imagesLength <= secondColMaxImages ? imagesLength - 1 : secondColMaxImages;
	const hasMore = imagesLength > secondColMaxImages ? imagesLength - secondColMaxImages - 1 : 0;
	return (
		<FeedImagesWrap>
			<Grid container height="100%" columnSpacing={0.5}>
				{new Array(cols).fill().map((_, colIndex) => {
					return (
						<Grid
							item
							key={`feed-images-col-${colIndex}`}
							xs={cols > 1 ? (colIndex === 0 ? 8 : 4) : 12}
						>
							{colIndex === 0 ? (
								<MainImage image={images[0]} onToggleGallery={toggleGallery} />
							) : (
								<Grid container height="100%" rowSpacing={0.5}>
									{new Array(secondColImagesLength).fill().map((__, secondColMaxImageIndex) => {
										const imageIndex = secondColMaxImageIndex + 1;
										return (
											<VerticalImage
												key={`feed-images-vertical-images_${imageIndex}`}
												image={images[imageIndex]}
												verticalLength={secondColImagesLength}
												hasMore={
													secondColMaxImageIndex === secondColImagesLength - 1 &&
													hasMore > 0 &&
													hasMore
												}
												onToggleGallery={toggleGallery}
											/>
										);
									})}
								</Grid>
							)}
						</Grid>
					);
				})}
			</Grid>
		</FeedImagesWrap>
	);
};

export default FeedImages;
