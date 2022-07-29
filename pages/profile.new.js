import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment";
import { SmartLayout } from "../components";
import { Loading } from "../components/common";
import { PersonalProfileDetails } from "../views/Profile/components/ProfileDetails";
import ProfileEdit from "../views/Profile/components/ProfileEdit";
import { updateProfileData } from "../store/thunks/profile.thunks";

export const VIEWS = {
	DETAILS: "details",
	EDIT: "edit",
};

const profileNew = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { user } = useSelector((state) => state.auth);
	const countries = useSelector((state) => state?.group?.countries);
	const [birthDate, setBirthDate] = useState(moment(user?.birthday));
	const [countryState, setCountryState] = useState(user?.country);
	const [deleteAvatarStatus, setDeleteAvatarStatus] = useState(false);
	const [activeView, setActiveView] = useState(router.query.view || VIEWS.DETAILS);

	const saveProfile = async (data) => {
		const {
			about,
			avatar,
			email,
			city,
			birthdayPrivacyType,
			phoneNumber,
			phonePrivacyType,
			emailPrivacyType,
			firstname,
			lastname,
		} = data;
		try {
			const {
				payload: { success, error },
			} = await dispatch(
				updateProfileData({
					firstname,
					lastname,
					email,
					about,
					birthday: moment(birthDate).format("DD.MM.yyyy") || null,
					city,
					country: countryState.id,
					id_country: countryState.id,
					phone_number: phoneNumber,
					birthday_privacy_type: birthdayPrivacyType,
					phone_privacy_type: phonePrivacyType,
					email_privacy_type: emailPrivacyType,
					avatar_image: avatar,
					delete_avatar: deleteAvatarStatus,
				}),
			);

			if (success) {
				setActiveView(VIEWS.DETAILS);
			} else {
				console.error(error);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleBirthDate = (value) => {
		if (value !== "Invalid date" || value !== null) {
			setBirthDate(value);
		}
	};
	const handleDeleteAvatar = (value) => {
		setDeleteAvatarStatus(value);
	};

	const handleCountry = ({ target }) => {
		const obj = countries.find((item) => item.text === target.value);
		setCountryState({ id: obj.value, name: obj.text, translation_key: obj.translationKey });
	};

	const toggleEditMode = (optData) => {
		if (activeView === VIEWS.EDIT) {
			if (optData) {
				saveProfile(optData);
			}
		} else {
			setActiveView(VIEWS.EDIT);
		}
	};

	const ViewComponent = useMemo(() => {
		return {
			[VIEWS.DETAILS]: PersonalProfileDetails,
			[VIEWS.EDIT]: ProfileEdit,
		}[activeView];
	}, [activeView]);

	return (
		<SmartLayout>
			{user ? (
				<ViewComponent
					user={user}
					handleDeleteAvatar={handleDeleteAvatar}
					changeMode={toggleEditMode}
					cancel={() => setActiveView(VIEWS.DETAILS)}
					handleBirthDate={handleBirthDate}
					handleCountry={handleCountry}
					birthDate={birthDate}
					countryState={countryState}
				/>
			) : (
				<Loading />
			)}
		</SmartLayout>
	);
};

export default profileNew;
