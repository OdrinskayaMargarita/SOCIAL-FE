import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styled from "@emotion/styled";

const SliderCardsContainer = styled.div`
	position: relative;
	margin: 0;
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
			content: none;
		}
	}
	.swiper-button-prev {
		left: -26px;
	}
	.swiper-button-next {
		right: -26px;
	}
`;

const SliderCardsNavPrev = ({ cref, ...props }) => (
	<div className="swiper-button-prev" ref={cref} {...props}>
		<ChevronLeftIcon />
	</div>
);

const SliderCardsNavNext = ({ cref, ...props }) => (
	<div className="swiper-button-next" ref={cref} {...props}>
		<ChevronRightIcon />
	</div>
);

const SliderCards = ({ type, children }) => {
	return <SliderCardsContainer>{children}</SliderCardsContainer>;
};

SliderCards.NavPrev = SliderCardsNavPrev;
SliderCards.NavNext = SliderCardsNavNext;

export default SliderCards;
