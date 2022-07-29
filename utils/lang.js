const AVAILABLE_LANGUAGES = { en: "EN", ru: "RU", ua: "UA" };

export const saveLanguageToStorage = (lang) => localStorage?.setItem("lang", lang);
export const getInitialLanguage = () => {
	return typeof window !== "undefined"
		? localStorage?.getItem("lang") ??
				AVAILABLE_LANGUAGES[navigator.language.split("-")[0]] ??
				AVAILABLE_LANGUAGES.en
		: AVAILABLE_LANGUAGES.en;
};
