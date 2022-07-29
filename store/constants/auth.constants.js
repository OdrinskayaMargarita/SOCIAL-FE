export const USER_NOT_CONFIRMED = "USER_NOT_CONFIRMED";
export const AUTH_GUARD_ROUTES = ["/profile"];
export const REGISTRATION_METHODS = {
	OWN: "OWN",
	ADMIN: "ADMIN",
	GOOGLE: "GOOGLE",
	FACEBOOK: "FACEBOOK",
	APPLE: "APPLE",
};
export const GOOGLE_AUTH_RESPONSE_TYPES = {
	REG: "registration",
	LOGIN: "login",
};
// User token expire time. Current: 72 hours
export const TOKEN_TTL = 259200000;
