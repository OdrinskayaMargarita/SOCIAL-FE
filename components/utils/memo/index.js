import Dictionary from "./dictionary";
import { idX } from "../fn";

/**
 * Creates memoization function
 *
 * @type {(getKey: (args: any[]) => any) => <A extends any[], R>(fn: (...args: A) => R) => (...args: A) => R}
 */
export const memoFactory = (getKey) => (fn) => {
	// Avoiding memoization on the server-side
	if (typeof window === "undefined") return fn;

	const cache = Dictionary();
	return (...args) => {
		const key = getKey(args);
		const result = cache.get(key);
		if (result) return result.value;
		const value = fn(...args);
		cache.add(key, { value });
		return value;
	};
};

/**
 * Memoize function using all arguments as cache key
 *
 * @type {{
 *   <A extends any[], R>(fn: (...args: A) => R) => (...args: A) => R;
 *   n: (n: number) => <A extends any[], R>(fn: (...args: A) => R) => (...args: A) => R;
 * }}
 */
const memo = memoFactory(idX);

/**
 * Creates slicer for list
 *
 * @type {(start: number, end: number) => <T>(list: T[]) => T[]}
 */
export const slice = (start, end) => (list) => list.slice(start, end);

/**
 * Memoize function using the first one argument as cache key
 */
export const memo1 = memoFactory(slice(0, 1));

/**
 * Memoize function using the first two arguments as cache key
 */
export const memo2 = memoFactory(slice(0, 2));

/**
 * Memoize function using the first three arguments as cache key
 */
export const memo3 = memoFactory(slice(0, 3));

/**
 * Creates memoization function that memoizes using the first `n` arguments as cache key
 */
memo.n = (n) => memoFactory(slice(0, n));

export default memo;
