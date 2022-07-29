export const calculateDateFromMs = (ms) => {
	let currentTimestamp = ms;
	const days = Math.floor(ms / (1000 * 60 * 60 * 24));
	currentTimestamp -= days * 1000 * 60 * 60 * 24;
	const hours = Math.floor(currentTimestamp / (1000 * 60 * 60));
	currentTimestamp -= hours * 1000 * 60 * 60;
	const minutes = Math.floor(currentTimestamp / 1000 / 60);
	currentTimestamp -= hours * 1000 * 60 * 60;
	return { days, hours, minutes };
};
