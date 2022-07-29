import React, { useCallback } from "react";
import { useTranslation } from "next-i18next";
import { Button, Card, Image } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import { changeGroupData, changeGroupListData } from "store/reducers/group.reducer";
import { joinGroup, leaveGroup } from "store/thunks/group.thunks";

const GroupDescriptionSection = ({ name, id, description, country, isFollowed, avatar }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const handleFollowStatus = useCallback(async () => {
		try {
			const action = isFollowed ? leaveGroup : joinGroup;
			const {
				payload: { success },
			} = await dispatch(action(id));
			if (success) {
				dispatch(changeGroupData({ key: "isFollowed", value: !isFollowed, id }));
			}
		} catch (e) {
			console.error(e);
		}
	}, [dispatch, isFollowed, changeGroupData]);

	return (
		<div>
			<div>
				<img src={avatar?.filename ? avatar?.url : null} alt="" />
			</div>
			<div>
				<Card>
					<Card.Content>
						<Card.Header>{name}</Card.Header>
						<Card.Description>{description}</Card.Description>
						<Card.Meta>
							{country.name} ∙ {country.city}
						</Card.Meta>
					</Card.Content>
				</Card>
			</div>
			<div>
				{isLoggedIn ? (
					<Button data-group-id={id} onClick={handleFollowStatus}>
						{isFollowed ? t("group.item.btn.leave") : t("group.item.btn.join")}
					</Button>
				) : null}
			</div>
		</div>
	);
};

export default GroupDescriptionSection;
