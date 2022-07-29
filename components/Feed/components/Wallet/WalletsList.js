import React from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import generium from "../../../../styles/assets/images/generium.png";

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
	cursor: pointer;
`;

const GeneriumIcon = styled.div`
	background-color: #020570;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	border-radius: 50%;
	height: 24px;
	width: 24px;
`;

const GeneriumIconImage = styled.img`
	height: 80%;
	width: 80%;
`;

const WalletsList = ({ getTransactions }) => {
	const walletData = useSelector((state) => state.group.data.wallet);
	return (
		<Box sx={{ marginBottom: "25px" }}>
			<Typography fontSize="16px" fontWeight="600" sx={{ padding: "0 20px 10px 20px" }}>
				Мои счета
			</Typography>
			<ListHeader>
				<Typography sx={{ width: "40%" }}>Счет</Typography>
				<Typography sx={{ width: "20%" }}>ID</Typography>
				<Typography>Баланс</Typography>
			</ListHeader>
			{walletData?.wallets?.map((item) => (
				<ListItem key={item.id} onClick={() => getTransactions(item.id)}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							width: "40%",
							gap: "10px",
						}}
					>
						<GeneriumIcon>
							<GeneriumIconImage src={generium.src} />
						</GeneriumIcon>
						<Typography fontWeight="fontWeightMedium">Расчетный счет</Typography>
					</Box>
					<Typography sx={{ width: "20%", color: "#748893" }}>{item.id}</Typography>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
						}}
					>
						<Typography fontWeight="fontWeightMedium">{item.balance}</Typography>
						<Typography sx={{ color: "#748893" }}>{item.currency}</Typography>
					</Box>
				</ListItem>
			))}
		</Box>
	);
};

export default WalletsList;
