import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";

export const normalizeApiResponse = (response) => {
	const errorMessage = get("error_message", response);
	const errorCode = get("error_code", response);
	const data = getOr({}, "data", response);

	return {
		data,
		error: {
			message: errorMessage || "",
			code: errorCode || "",
		},
		success: getOr(false, "success", response),
	};
};

export const request = async (url, parameters = {}) => fetch(url, parameters);

export const authorizedRequest = async (url, parameters = {}) => {
	const token = localStorage.getItem("token");
	const headers = {
		...parameters.headers,
		Authorization: token,
	};
	return token
		? request(url, { ...parameters, headers })
		: Promise.reject(
				new Error({
					error: {
						message: "You are not authorized",
					},
				}),
		  );
};
