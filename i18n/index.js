import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./en/index";
import translationRU from "./ru/index";

const resources = {
	en: {
		translation: translationEN,
	},
	ru: {
		translation: translationRU,
	},
};

i18n.use(initReactI18next).init({
	resources,
	languages: ["en", "ru"],
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false, // react already safes from xss
	},
});

export default i18n;
