export function translateColumnHeaders(t, columnDefs) {
	return columnDefs.map((item) => {
		return {
			...item,
			headerName: typeof item.headerName === "string" ? t(item.headerName) : item.headerName,
		};
	});
}

export const saveLanguageToStorage = (lang) => localStorage.setItem("i18n", lang);

export const calculateInitialLanguage = () =>
	localStorage.getItem("i18n") || (navigator.language.includes("ru") ? "ru" : "en");
