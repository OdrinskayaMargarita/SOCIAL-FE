import React, { useCallback } from "react";
import { oneOf, shape, string } from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { SliderCard, SliderCards } from "components/SliderCards";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";

import { joinGroup, leaveGroup } from "store/thunks/group.thunks";
import { changeTopGroupListData } from "store/reducers/group.reducer";
import { useRouter } from "next/router";
import bgGroup from "../../../styles/assets/images/bg-group.png";

SwiperCore.use([Navigation]);

const TYPE_SLIDER = "group";

const TopGroupItem = ({
	id,
	type,
	name,
	members,
	isFollowed,
	feedStatistic,
	background,
	avatar,
}) => {
	const { translation } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const backgroundImage = background && background?.url ? background?.url : bgGroup.src;
	const logoImage = avatar && avatar?.url ? avatar.url : null;
	const router = useRouter();
	const handleFollowStatus = useCallback(async () => {
		try {
			const action = isFollowed ? leaveGroup : joinGroup;
			const {
				payload: { success },
			} = await dispatch(action(id));
			if (success) {
				dispatch(changeTopGroupListData({ key: "isFollowed", value: !isFollowed, id }));
			}
		} catch (e) {
			console.error(e);
		}
	}, [dispatch, isFollowed, changeTopGroupListData]);
	return (
		<SliderCard
			type={type}
			backgroundImage={backgroundImage}
			onClick={() => router.push(`/social/groups/${id}`)}
		>
			<SliderCard.Image
				backgroundImage={backgroundImage}
				backgroundImageAlt={background?.filename}
				logoImage={logoImage}
				logoImageAlt={avatar?.filename}
			/>
			<SliderCard.Title>{name}</SliderCard.Title>
			<SliderCard.Meta users={members} posts={feedStatistic?.total} />
			{type === "group" ? (
				isFollowed ? (
					<SliderCard.Action onClick={handleFollowStatus}>
						{translation?.["groups.top.leave"]}
					</SliderCard.Action>
				) : (
					<SliderCard.Action onClick={handleFollowStatus}>
						{translation?.["groups.top.join"]}
					</SliderCard.Action>
				)
			) : null}
		</SliderCard>
	);
};

TopGroupItem.propTypes = {
	type: oneOf(["group", "user"]).isRequired,
	background: shape({
		url: string,
		filename: string,
	}),
	avatar: shape({
		url: string,
		filename: string,
	}),
};

const TopGroupsSection = ({ groups = [] }) => {
	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);
	const configNav = {
		// Both prevEl & nextEl are null at render so this does not work
		prevEl: navigationPrevRef.current,
		nextEl: navigationNextRef.current,
	};
	const initNavigation = (swiper) => {
		// Delay execution for the refs to be defined
		setTimeout(() => {
			// Override prevEl & nextEl now that refs are defined
			// eslint-disable-next-line no-param-reassign
			swiper.params.navigation.prevEl = navigationPrevRef.current;
			// eslint-disable-next-line no-param-reassign
			swiper.params.navigation.nextEl = navigationNextRef.current;

			// Re-init navigation
			swiper.navigation.destroy();
			swiper.navigation.init();
			swiper.navigation.update();
		});
	};

	return (
		<SliderCards type={TYPE_SLIDER}>
			<Swiper
				slidesPerView="auto"
				spaceBetween={30}
				onSwiper={initNavigation}
				navigation={configNav}
			>
				{groups.map((group, index) => (
					<SwiperSlide style={{ width: 324, paddingBottom: 16 }} key={`top_group_${index}`}>
						<TopGroupItem type="group" {...group} />
					</SwiperSlide>
				))}
			</Swiper>
			<SliderCards.NavPrev cref={navigationPrevRef} />
			<SliderCards.NavNext cref={navigationNextRef} />
		</SliderCards>
	);
};

export default TopGroupsSection;
