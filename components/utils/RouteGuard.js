import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { AUTH_GUARD_ROUTES } from "store/constants/auth.constants";
import { getUserToken, isTokenValid, removeUserToken } from "utils/auth.utils";
import { logout } from "store/reducers/auth.reducer";
import { openModal } from "store/reducers/app.reducer";
import { MODAL_TYPES } from "core-components/Modal/constants";

export const RouteGuard = ({ children }) => {
	const router = useRouter();
	const { isLoggedIn, user } = useSelector((state) => state.auth);
	const [canActive, setActive] = useState(false);
	const dispatch = useDispatch();

	const authCheck = (url) => {
		// redirect to login page if accessing a private page and not logged in

		const path = url.split("?")[0];
		if (!isLoggedIn && AUTH_GUARD_ROUTES.includes(path)) {
			setActive(false);
			dispatch(openModal(MODAL_TYPES.LOGIN_MODAL));
		} else {
			setActive(true);
		}
	};

	const tokenCheck = () => {
		if (getUserToken() && !isTokenValid()) {
			logout();
		}
	};

	useEffect(() => {
		authCheck(router.asPath);
		tokenCheck();
		const hideContent = () => setActive(false);
		router.events.on("routeChangeStart", hideContent);
		router.events.on("routeChangeComplete", authCheck);
		return () => {
			router.events.off("routeChangeStart", hideContent);
			router.events.off("routeChangeComplete", authCheck);
		};
	}, [router]);

	return canActive && children;
};
