import React from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from "moment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import walletIcon from "../../../../styles/assets/images/walletIcon.png";
import { SliderCard, SliderCards } from "../../../SliderCards";
import { calculateInitialLanguage } from "../../../../i18n/utils";
/* eslint-disable */

const ListHeader = styled.div`
	display: flex;
	height: 40px;
	width: 100%;
	align-items: center;
	border-bottom: 1px solid rgba(109, 144, 155, 0.2);
	border-top: 1px solid rgba(109, 144, 155, 0.2);
  padding: 0 20px;
`;

const ListItem = styled.div`
	display: flex;
	height: 55px;
	width: 100%;
	align-items: center;
	border-bottom: 1px solid rgba(109, 144, 155, 0.2);
	padding: 0 20px;
`;

const DetailsHeader = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	padding: 0 20px 5px 20px;
`;

const GeneriumIcon = styled.div`
	background-color: #153dbe;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	border-radius: 50%;
	height: 32px;
	width: 32px;
`;

const GeneriumIconImage = styled.img`
	height: 50%;
	width: 50%;
`;

const WalletsDetails = ({ getTransactions, currentWallet, setCurrentWallet }) => {
	const walletData = useSelector((state) => state.group.data.wallet);
	const transactionData = useSelector((state) => state.group.data.transaction);

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
			swiper.params.navigation.prevEl = navigationPrevRef.current;
			swiper.params.navigation.nextEl = navigationNextRef.current;

			// Re-init navigation
			swiper.navigation.destroy();
			swiper.navigation.init();
			swiper.navigation.update();
		});
	};
	return (
		<>
			<DetailsHeader>
				<Box
					onClick={() => setCurrentWallet(null)}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
						cursor: "pointer",
						paddingTop: "10px"
					}}
				>
					<ArrowBackIcon sx={{ marginBottom: "3px" }} fontSize="12"/>
					<Typography variant="h3">
						Счета
					</Typography>
				</Box>
			</DetailsHeader>
			<Box
				sx={{
					marginTop: "25px",
					marginBottom: "25px",
					padding: "0 20px"
				}}
			>
				<SliderCards type="group">
					<Swiper slidesPerView="auto" navigation={configNav} onSwiper={initNavigation}>
						{walletData?.wallets?.map((item) => (
							<SwiperSlide key={item.id} onClick={() => getTransactions(item.id)}>
								<SliderCard
									type="wallet"
									isActive={currentWallet === item.id }
								>
									<SliderCard.Title>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												padding: "10px 0",
												cursor: "pointer",
											}}
										>
											<GeneriumIcon>
												<GeneriumIconImage src={walletIcon.src} />
											</GeneriumIcon>
											<Box>
												<Typography fontWeight="fontWeightMedium" fontSize="14px">Расчетный счет</Typography>
												<Typography fontWeight="fontWeightMedium" fontSize="18px">{item.balance}</Typography>
											</Box>
											<Typography sx={{ color: "#748893", alignSelf: "flex-start" }}>{item.currency}</Typography>
										</Box>
									</SliderCard.Title>
								</SliderCard>
							</SwiperSlide>
						))}
					</Swiper>
					<SliderCards.NavPrev cref={navigationPrevRef} />
					<SliderCards.NavNext cref={navigationNextRef} />
				</SliderCards>
			</Box>
			<ListHeader>
				<Typography sx={{ width: "20%" }}>Время</Typography>
				<Typography sx={{ width: "20%" }}>Транзакции</Typography>
				<Typography sx={{ width: "20%" }}>ID</Typography>
				<Typography sx={{ width: "20%" }}>Сумма/Баланс</Typography>
				<Typography sx={{ width: "20%" }}>Статус</Typography>
			</ListHeader>
			{transactionData?.map((item) => (
				<ListItem key={item.id}>
					<Typography fontWeight="fontWeightMedium" sx={{ width: "20%" }}>
						{moment
							.unix(item?.create_timestamp)
							.locale(calculateInitialLanguage())
							.format("MMM DD YYYY HH:mm")}
					</Typography>
					<Typography fontWeight="fontWeightMedium" sx={{ width: "20%" }}>
						{item?.operation}
					</Typography>
					<Typography fontWeight="fontWeightMedium" sx={{ width: "20%" }}>
						{item.id}
					</Typography>
					<Typography fontWeight="fontWeightMedium" sx={{ width: "20%" }}>
						{item?.amount}
					</Typography>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
						}}
					>
						<CheckCircleIcon sx={{ color: "#00C8D5" }} />
						<Typography fontWeight="fontWeightMedium" sx={{ width: "20%" }}>
							{item?.status}
						</Typography>
					</Box>
				</ListItem>
			))}
		</>
	);
};

export default WalletsDetails;
