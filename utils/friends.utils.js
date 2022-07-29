import { normalizeUserData } from "./auth.utils";

export const normilizeFriendsData = (friends = []) =>
	friends.map((friend) => normalizeUserData(friend.user));
