import React, { useCallback, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import generium from "../../../../styles/assets/images/generium.png";
import info from "../../../../styles/assets/images/info.png";
import WalletsList from "./WalletsList";
import { fetchTransactions } from "../../../../store/thunks/group.thunks";
import WalletsDetails from "./WaletDetails";

const WalletWrapper = styled.header`
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 25px;
	font-family: "Montserrat", "Helvetica Neue", sans-serif;
`;

const CostLabelText = styled(Box)`
	font-size: 12px;
	line-height: 16px;
	font-weight: 500;
	color: #748893;
`;

const CostBodyText = styled(Typography)`
	font-size: 28px;
	line-height: 34px;
	font-weight: 400;
`;

const GeneriumIcon = styled.div`
	background-color: #020570;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	border-radius: 50%;
	height: 16px;
	width: 16px;
`;

const GeneriumIconImage = styled.img`
	height: 80%;
	width: 80%;
`;

const InfoMessage = styled.div`
	margin-top: 25px;
	width: 100%;
	background-color: #edf2f3;
	border-radius: 8px;
	padding: 16px;
	display: flex;
	gap: 20px;
`;

const GroupWallet = () => {
	const dispatch = useDispatch();
	const [currentWallet, setCurrentWallet] = useState(null);
	const walletData = useSelector((state) => state.group.data.wallet);

	const {
		query: { id },
	} = useRouter();

	const getTransactions = useCallback(
		(walletId) => {
			dispatch(fetchTransactions({ groupId: id, walletId }));
			setCurrentWallet(walletId);
		},
		[id],
	);

	return (
		<>
			{currentWallet ? (
				<WalletsDetails
					getTransactions={getTransactions}
					currentWallet={currentWallet}
					setCurrentWallet={setCurrentWallet}
				/>
			) : (
				<>
					<WalletWrapper>
						{/* <Typography */}
						{/*	noWrap */}
						{/*	component="p" */}
						{/*	fontWeight="600" */}
						{/*	lineHeight="32px" */}
						{/*	fontSize="24px" */}
						{/*	align="center" */}
						{/*	sx={{ paddingBottom: "24px", marginTop: "20px" }} */}
						{/* > */}
						{/*	Кошелек */}
						{/* </Typography> */}
						<Box
							sx={{
								width: "100%",
								display: "flex",
								justifyContent: "space-between",
							}}
							mt={3}
						>
							<Box>
								<CostLabelText>Общий балланс</CostLabelText>
								<CostBodyText>$ {walletData?.total_balances[0]?.total_balance}</CostBodyText>
							</Box>
							<Box>
								<CostLabelText>Generium GNR</CostLabelText>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: "10px",
									}}
								>
									<GeneriumIcon>
										<GeneriumIconImage src={generium.src} />
									</GeneriumIcon>
									<Typography fontSize="18px" fontWeight="400">
										{walletData?.total_balances[1]?.total_balance}
									</Typography>
								</Box>
							</Box>
						</Box>
						<InfoMessage>
							<img src={info.src} alt="info" />
							<Box>
								<Typography fontSize="12px" fontWeight="fontWeightBold">
									Добро пожаловать в кошелек.
								</Typography>
								<Typography fontSize="12px">
									В ближайшее время будет доступна функция пополнения и вывода средств.
								</Typography>
							</Box>
						</InfoMessage>
					</WalletWrapper>
					<WalletsList getTransactions={getTransactions} />
				</>
			)}
		</>
	);
};

export default GroupWallet;
