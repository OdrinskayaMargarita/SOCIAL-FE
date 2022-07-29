import { call, isFunc } from "./fn";
import memo from "./memo";

export const handleWith = (...handlers) => {
	const fnHandlers = handlers.filter(isFunc);
	return (event) => fnHandlers.forEach(call(event));
};

handleWith.m = memo(handleWith);

export const prevent = (event) => {
	event.preventDefault();
};

export const stop = (event) => {
	event.stopPropagation();
};

export const setRef = (ref, value) => {
	if (ref == null) return;
	if (isFunc(ref)) {
		ref(value);
		return;
	}
	ref.current = value; // eslint-disable-line no-param-reassign
};

const assignRef = (element) => (ref) => setRef(ref, element);

export const composeRefs =
	(...refs) =>
	(element) =>
		refs.forEach(assignRef(element));

composeRefs.m = memo(composeRefs);
