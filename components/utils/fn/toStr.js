export const toStr = (value) => (typeof value === "symbol" ? value.toString() : `${value}`);
