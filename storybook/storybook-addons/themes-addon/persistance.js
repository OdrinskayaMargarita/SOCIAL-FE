import { STORAGE_KEY } from "./constants";

const storage = global.localStorage;

export const readTheme = () => storage.getItem(STORAGE_KEY);
export const writeTheme = (theme) => storage.setItem(STORAGE_KEY, theme);
