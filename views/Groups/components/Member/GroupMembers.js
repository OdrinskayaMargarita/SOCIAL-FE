import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Box } from "@material-ui/core";
import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { groupTypes, membersGroupListTypes } from "store/constants/groups.constants";
import Members from "./Members";
import Aplicants from "./Aplicants";

const Wrapper = styled.div`
	border-bottom: 1px solid #e1e9eb;
`;

export const GroupMembers = () => {
	const [listType, setListType] = useState(membersGroupListTypes.MEMBERS);
	const {
		data: { itself },
	} = useSelector((state) => state.group);
	const { user } = useSelector((state) => state.auth);
	const isItOwner = itself.owner?.id === user?.id;
	const { translation } = useSelector((state) => state.app);

	if (!isItOwner || itself?.type === groupTypes.PUBLIC) {
		return <Members />;
	}
	return (
		<Wrapper>
			<Box p="24px 20px">
				{/* <Typography variant="h2">{translation["group.members"]}</Typography> */}
				<Box>
					<Button
						variant={
							listType === membersGroupListTypes.MEMBERS ? "containedRounded" : "lightGreyRounded"
						}
						onClick={() => setListType(membersGroupListTypes.MEMBERS)}
					>
						{translation["group.members"]}
					</Button>
					<Button
						variant={
							listType === membersGroupListTypes.APLICANTS ? "containedRounded" : "lightGreyRounded"
						}
						onClick={() => setListType(membersGroupListTypes.APLICANTS)}
						sx={{ marginLeft: "8px" }}
					>
						{translation["group.requests"]}
						{/* TODO: Implement a little bit latter when solve problem with recieved count of aplicants */}
						<Box
							sx={{
								padding: "2px 8px",
								backgroundColor: "#fff",
								color: "#000000",
								borderRadius: "24px",
								marginLeft: "6px",
							}}
						>
							{itself?.awaitingMembersCount || 0}
						</Box>
					</Button>
				</Box>
			</Box>
			{listType === membersGroupListTypes.APLICANTS ? <Aplicants /> : <Members />}
		</Wrapper>
	);
};
