import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { Box, Button, Grid, Typography } from "@mui/material";
import Avatar from "core-components/Avatar";
import useGroups from "views/Groups/hooks/useGroups";
import { groupsMembersRole } from "store/constants/groups.constants";
import { useSelector } from "react-redux";

const GroupListAplicantRow = ({ id, lastname, firstname, avatar }) => {
	const router = useRouter();

	const { user } = useSelector((state) => state.auth);

	const onRowClicked = () => {
		if (user.id === id) {
			router.push("/profile");
		} else {
			router.push(`/social/users/${id}`);
		}
	};

	const { changeApplicatRole, group } = useGroups();
	const onChangeRole = (e, role) => {
		e.stopPropagation();
		changeApplicatRole({
			id_user: id,
			id_group: group?.id,
			role,
		});
	};
	return (
		<Grid
			container
			onClick={() => onRowClicked()}
			sx={{
				padding: "10px 20px",
				borderTop: "1px solid #e1e9eb",
			}}
		>
			<Grid item xs={7} sx={{ display: "flex", alignItems: "center" }}>
				<Box>
					<Avatar src={avatar?.url} firstName={firstname} lastName={lastname} />
				</Box>
				<Typography ml={2}>
					{firstname} {lastname}
				</Typography>
			</Grid>
			<Grid
				item
				xs={5}
				sx={{ textAlign: "end", display: "flex", alignItems: "center", justifyContent: "flex-end" }}
			>
				<Button
					onClick={(e) => onChangeRole(e, groupsMembersRole.MODERATOR)}
					variant="contained"
					sx={{ marginRight: "12px" }}
				>
					Принять
				</Button>
				<Button onClick={(e) => onChangeRole(e, groupsMembersRole.REQUEST_REJECTED)} variant="grey">
					Отклонить
				</Button>
			</Grid>
		</Grid>
	);
};

export default GroupListAplicantRow;
