import { SmartFeedAuthor } from "components/smart/SmartFeed/components";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import { Dialog } from "@material-ui/core";
import { DialogContent, Grid } from "@mui/material";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import CardMedia from "@mui/material/CardMedia";

const StyledSwipper = styled(Swiper)`
	max-height: 100vh;
	background-color: black;
	.swiper-button-prev.swiper-button-disabled,
	.swiper-button-next.swiper-button-disabled {
		display: none;
	}
	.swiper-button-prev,
	.swiper-button-next {
		position: absolute;
		top: 50%;
		margin-top: -26px;
		border: 1px solid rgba(109, 144, 155, 0.3);
		box-shadow: 0 8px 8px rgba(58, 143, 173, 0.05), 0 2px 4px rgba(58, 143, 173, 0.1);
		border-radius: 50%;
		height: 52px;
		width: 52px;
		color: #000;
		background-color: #fff;
		background-image: none;
		:global(.icon) {
			margin: 0;
			&:before {
				position: relative;
				top: -3px;
			}
		}
		&:after {
			font-size: 12px;
		}
	}
`;

const RightSideWrapper = styled(Grid)`
	padding: 25px;
	svg {
		display: block;
		margin-left: auto;
		cursor: pointer;
	}
`;

const AuthorWrap = styled.div`
	margin-top: 45px;
`;

const ImagesGallery = ({ isOpen, onClose, gallery, data }) => {
	return (
		<Dialog fullWidth maxWidth="xl" open={isOpen} onClose={onClose} fullScreen>
			<Grid container height="100%">
				<Grid item xs={12} md={8}>
					<StyledSwipper navigation>
						{gallery?.map((image) => (
							<SwiperSlide key={image.filename}>
								<CardMedia component="img" image={image.url} alt="image" sx={{ height: "100vh" }} />
							</SwiperSlide>
						))}
					</StyledSwipper>
				</Grid>
				<RightSideWrapper item xs={12} md={4}>
					<CloseIcon onClick={onClose} />
					<AuthorWrap>
						<SmartFeedAuthor {...data} />
					</AuthorWrap>
				</RightSideWrapper>
			</Grid>
		</Dialog>
	);
};

export default ImagesGallery;
