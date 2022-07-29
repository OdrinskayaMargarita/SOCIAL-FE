/**
 * Type `Fn<Args extends any[], R>` - Generic Function
 *
 * @template {any[]} A
 * @template R
 * @typedef {(...args: A) => R} Fn
 */

/**
 * Type `Callback<Err extends Error, Res>` - Generic First-Error Callback
 *
 * @template {Error} E
 * @template R
 * @typedef {(error: E, result: R) => void} Callback
 */

/**
 * Type `CompareFn<T>` - Generic Compare Function
 *
 * @template T
 * @typedef {(item: T, list: T[], index: number) => number} CompareFn
 */

/**
 * Type `SyncType<T>` - Type extracts type packed into the Promise
 *
 * @template T
 * @typedef {T extends Promise<infer Packed> ? Packed : T} SyncType
 */

/**
 * Identiry Function
 *
 * @see https://en.wikipedia.org/wiki/Identity_function
 *
 * @type <T>(x: T) => T
 */
export const idX = (x) => x;

/**
 * Creates applicator: the function that call its argument with arguments
 * specified when applicator has been created
 *
 * @type {<A extends any[]>(...args: A) => <R>(fn: Fn<A, R>) => R}
 */
export const call =
	(...args) =>
	(fn) =>
		fn(...args);

/**
 * Checks if argument is a Promise or not (actualy if argument is thanable)
 *
 * @type {(value: any) => value is Promise<any>}
 */
export const isPromise = (value) => value != null && typeof value.then === "function";

/**
 * Checks if argument is a Function
 *
 * @type {(value: any) => value is Function}
 */
export const isFunc = (value) => typeof value === "function";

/**
 * Replaces the first argument with the second one if the the first is not a Function
 *
 * @type {<T>(value: any, def: T) => Function | T}
 */
export const ensureFunc = (value, def) => (isFunc(value) ? value : def);

/**
 * Composes two function:
 *
 * @example
 * const f = x => x + 1;
 * const g = x => x * 2;
 * const h = compose(f, g);
 * const h_ = x => f(g(x)); // the same as h
 *
 * @type {<A extends any[], R2, R1>(f1: (arg: R2) => R1, f2: (...args: A) => R2) => (...args: A) => R1}
 *
 */
export const compose2 =
	(f, g) =>
	(...args) =>
		f(g(...args));

/**
 * Composes any number of functions.
 * 
 * @type {{
  (): <T>(x: T) => T

  <A extends any[], R>(f: (...args: A) => R): (...args: A) => R;

  <A extends any[], R2, R1>(
    f1: (arg: R2) => R1,
    f2: (...args: A) => R2
  ): (...args: A) => R1;
  
  <A extends any[], R3, R2, R1>(
    f1: (arg: R2) => R1,
    f2: (arg: R3) => R2,
    f3: (...args: A) => R3
  ): (...args: A) => R1;
  
  <A extends any[], R4, R3, R2, R1>(
    f1: (arg: R2) => R1,
    f2: (arg: R3) => R2,
    f3: (arg: R4) => R3,
    f4: (...args: A) => R4
  ): (...args: A) => R1;
  
  <A extends any[], R5, R4, R3, R2, R1>(
    f1: (arg: R2) => R1,
    f2: (arg: R3) => R2,
    f3: (arg: R4) => R3,
    f4: (arg: R5) => R4,
    f5: (...args: A) => R5
  ): (...args: A) => R1;
  
  <A extends any[], R6, R5, R4, R3, R2, R1>(
    f1: (arg: R2) => R1,
    f2: (arg: R3) => R2,
    f3: (arg: R4) => R3,
    f4: (arg: R5) => R4,
    f5: (arg: R6) => R5,
    f6: (...args: A) => R6
  ): (...args: A) => R1;
  
  <A extends any[], R7, R6, R5, R4, R3, R2, R1>(
    f1: (arg: R2) => R1,
    f2: (arg: R3) => R2,
    f3: (arg: R4) => R3,
    f4: (arg: R5) => R4,
    f5: (arg: R6) => R5,
    f6: (arg: R7) => R6,
    f7: (...args: A) => R7
  ): (...args: A) => R1;
  
  <A extends any[], R8, R7, R6, R5, R4, R3, R2, R1>(
    f1: (arg: R2) => R1,
    f2: (arg: R3) => R2,
    f3: (arg: R4) => R3,
    f4: (arg: R5) => R4,
    f5: (arg: R6) => R5,
    f6: (arg: R7) => R6,
    f7: (arg: R8) => R7,
    f8: (...args: A) => R8
  ): (...args: A) => R1;
  
  <A extends any[], R9, R8, R7, R6, R5, R4, R3, R2, R1>(
    f1: (arg: R2) => R1,
    f2: (arg: R3) => R2,
    f3: (arg: R4) => R3,
    f4: (arg: R5) => R4,
    f5: (arg: R6) => R5,
    f6: (arg: R7) => R6,
    f7: (arg: R8) => R7,
    f8: (arg: R9) => R8,
    f9: (...args: A) => R9
  ): (...args: A) => R1;
  
  <A extends any[], RA, R9, R8, R7, R6, R5, R4, R3, R2, R1>(
    f1: (arg: R2) => R1,
    f2: (arg: R3) => R2,
    f3: (arg: R4) => R3,
    f4: (arg: R5) => R4,
    f5: (arg: R6) => R5,
    f6: (arg: R7) => R6,
    f7: (arg: R8) => R7,
    f8: (arg: R9) => R8,
    f9: (arg: RA) => R9,
		fa: (...args: A) => RA;

	<A extends any[], RB, RA, R9, R8, R7, R6, R5, R4, R3, R2, R1>(
    f1: (arg: R2) => R1,
    f2: (arg: R3) => R2,
    f3: (arg: R4) => R3,
    f4: (arg: R5) => R4,
    f5: (arg: R6) => R5,
    f6: (arg: R7) => R6,
    f7: (arg: R8) => R7,
    f8: (arg: R9) => R8,
		f9: (arg: RA) => R9,
		fa: (arg: RB) => RA,
    fb: (...args: A) => RB
  ): (...args: A) => R1;
  
  (...fns: Function[]): Function;
}} */
export const compose = (...fns) => (fns.length > 0 ? fns.reduce(compose2) : idX);

/**
 * Re-throws error mapped with `errorsMapper`.
 *
 * If `errorsMapper` return falsy value the original error will be re-thrown
 *
 * @type {<E1 extends Error, E2 extends Error>(errorsMapper: Fn<[E1], E2 | null | undefined>) => (e: E1) => never}
 */
export const mapErrors = (errorsMapper) => (err) => {
	throw errorsMapper(err) || err;
};

/**
 * Decorator Factory `skipIf` adds effect of replace decorated function (`fn`) call with
 * call of `altFn` if `predicate` returns truthy value.
 *
 * if `altFn` is not specified the [identity](#idX) function will be used
 *
 * @type {<A extends any[], TA>(predicate: Fn<A, boolean>, altFn?: Fn<A, TA>) => <T>(fn: Fn<A, T>) => Fn<A, T | TA>}
 */
export const skipIf =
	(predicate = () => true, altFn = idX) =>
	(fn) =>
	(...args) =>
		predicate(...args) ? altFn(...args) : fn(...args);

/**
 * Checks if value is null or undefined
 *
 * @type {(value: any) => value is null | undefined}
 */
export const isEmpty = (value) => value == null;

/**
 * Mergers list of objects to the new one
 *
 * @type <T extends {}>(objects: Array<{}>) => T}
 */
export const mergeAll = (props) => Object.assign({}, ...props);

/**
 * Merges two or more objects some of those could be an async
 *
 * @type {{
 *  <T>(...props: Array<{}>): T
 *  <T>(...props: Array<{} | Promise<{}>>): Promise<T>
 * }}
 */
export const mergeProps = (...props) =>
	props.some(isPromise) ? Promise.all(props).then(mergeAll) : mergeAll(props);

/**
 * Creates applicator: the function that call its argument with arguments
 * specified when applicator has been created
 */
export const callWith = call;

const promiseCallback = (resolve, reject) => (err, result) => err ? reject(err) : resolve(result);

/**
 * Converts error-first callbacked async function to function returns a promise
 *
 * @type {<A extends any[], E extends Error, R>(fn: (...args: A, cb: Callback<E, R>) => void) => Fn<A, Promise<R>>}
 */
export const promisify = (fn) =>
	function promisified(...args) {
		return new Promise((resolve, reject) =>
			fn.apply(this, args.concat(promiseCallback(resolve, reject))),
		);
	};

/**
 * Calls error-first callbacked async funcation and returns a promise
 *
 * @type {<A extends any[], E extends Error, R>(fn: (...args: A, cb: Callback<E, R>) => void) => Promise<R>}
 */
export const asAsync = (fn, ...args) =>
	new Promise((resolve, reject) => fn(...args, promiseCallback(resolve, reject)));

/**
 * Mergers argument objects to the new one
 *
 * @type <T extends {}>(...partials: Array<{}>) => T}
 */
export const merge = (...partials) => Object.assign({}, ...partials);

/**
 * Sums two numbers
 *
 * Function created to be used as reducer
 *
 * @type {(a: number, b: number) => number}
 */
export const summ = (a, b) => a + b;

/**
 * Creates a getter for field or index.
 *
 * @type {{
 * (index: number): <C extends Array<any> | null>(container?: C) => C extends Array<infer T> ? T : C;
 * <N extends string | symbol>(field: N): <C extends { } | null>(container?: C) =>
 *   C extends null | undefined ? C :
 *   C extends { [p in N]?: infer T } ? T :
 *   undefined;
 * }}
 */
export const get = (fieldOrIndex) => (container) => container && container[fieldOrIndex];

const order2 =
	(sort1, sort2) =>
	(...args) =>
		sort1(...args) || sort2(...args);

/**
 * Creates a complex comparing function based on the argument comparing functions
 *
 * @type {<T>(...sorters: CompareFn<T>[]) => CompareFn<T>}
 */
export const order = (...sorters) => sorters.reduce(order2);

/**
 * Basing on argument comparing functions creates a function that sorts an array
 *
 * Function returns a new Array.
 *
 * @template T
 * @typedef {(item: T, list: T[], index: number) => number} CompareFn
 * @type {<T>(...sorters: CompareFn<T>[]) => <S extends T>(list: S[]) => S[]}
 */
export const orderWith = (...sorters) => {
	const compare = order(...sorters);
	return (list) => list.slice().sort(compare);
};

/**
 * Builds new function from the arguments.
 * New function calls argument-functions and return promise that resolves
 * with array of results returned by correspondent argument function.
 *
 * @type {{
   (): () => Promise<[]>;

  <A extends any[], R1>(f1: Fn<A, R1>): (...args: A) => Promise<[SyncType<R1>]>;

  <A extends any[], R1, R2>(
    f1: Fn<A, R1>,
    f2: Fn<A, R2>
  ): (...args: A) => Promise<[SyncType<R1>, SyncType<R2>]>;

  <A extends any[], R1, R2, R3>(
    f1: Fn<A, R1>,
    f2: Fn<A, R2>,
    f3: Fn<A, R3>
  ): (...args: A) => Promise<[SyncType<R1>, SyncType<R2>, SyncType<R3>]>;

  <A extends any[], R1, R2, R3, R4>(
    f1: Fn<A, R1>,
    f2: Fn<A, R2>,
    f3: Fn<A, R3>,
    f4: Fn<A, R4>,
  ): (...args: A) => Promise<[
    SyncType<R1>, SyncType<R2>, SyncType<R3>,
    SyncType<R4>,
  ]>;

  <A extends any[], R1, R2, R3, R4, R5>(
    f1: Fn<A, R1>,
    f2: Fn<A, R2>,
    f3: Fn<A, R3>,
    f4: Fn<A, R4>,
    f5: Fn<A, R5>,
  ): (...args: A) => Promise<[
    SyncType<R1>, SyncType<R2>, SyncType<R3>,
    SyncType<R4>, SyncType<R5>,
  ]>;

  <A extends any[], R1, R2, R3, R4, R5, R6>(
    f1: Fn<A, R1>,
    f2: Fn<A, R2>,
    f3: Fn<A, R3>,
    f4: Fn<A, R4>,
    f5: Fn<A, R5>,
    f6: Fn<A, R6>,
  ): (...args: A) => Promise<[
    SyncType<R1>, SyncType<R2>, SyncType<R3>,
    SyncType<R4>, SyncType<R5>, SyncType<R6>,
  ]>;

  <A extends any[], R1, R2, R3, R4, R5, R6, R7>(
    f1: Fn<A, R1>,
    f2: Fn<A, R2>,
    f3: Fn<A, R3>,
    f4: Fn<A, R4>,
    f5: Fn<A, R5>,
    f6: Fn<A, R6>,
    f7: Fn<A, R7>,
  ): (...args: A) => Promise<[
    SyncType<R1>, SyncType<R2>, SyncType<R3>,
    SyncType<R4>, SyncType<R5>, SyncType<R6>,
    SyncType<R7>,
  ]>;

  <A extends any[], R1, R2, R3, R4, R5, R6, R7, R8>(
    f1: Fn<A, R1>,
    f2: Fn<A, R2>,
    f3: Fn<A, R3>,
    f4: Fn<A, R4>,
    f5: Fn<A, R5>,
    f6: Fn<A, R6>,
    f7: Fn<A, R7>,
    f8: Fn<A, R8>,
  ): (...args: A) => Promise<[
    SyncType<R1>, SyncType<R2>, SyncType<R3>,
    SyncType<R4>, SyncType<R5>, SyncType<R6>,
    SyncType<R7>, SyncType<R8>,
  ]>;

  <A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    f1: Fn<A, R1>,
    f2: Fn<A, R2>,
    f3: Fn<A, R3>,
    f4: Fn<A, R4>,
    f5: Fn<A, R5>,
    f6: Fn<A, R6>,
    f7: Fn<A, R7>,
    f8: Fn<A, R8>,
    f9: Fn<A, R9>,
  ): (...args: A) => Promise<[
    SyncType<R1>, SyncType<R2>, SyncType<R3>,
    SyncType<R4>, SyncType<R5>, SyncType<R6>,
    SyncType<R7>, SyncType<R8>, SyncType<R9>,
  ]>;

  <A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, RA>(
    f1: Fn<A, R1>,
    f2: Fn<A, R2>,
    f3: Fn<A, R3>,
    f4: Fn<A, R4>,
    f5: Fn<A, R5>,
    f6: Fn<A, R6>,
    f7: Fn<A, R7>,
    f8: Fn<A, R8>,
    f9: Fn<A, R9>,
    fa: Fn<A, RA>,
  ): (...args: A) => Promise<[
    SyncType<R1>, SyncType<R2>, SyncType<R3>,
    SyncType<R4>, SyncType<R5>, SyncType<R6>,
    SyncType<R7>, SyncType<R8>, SyncType<R9>,
    SyncType<RA>,
  ]>;

  <A extends any[], R1>(...fns: Fn<A,R>[]): (...args: A) => Promise<SyncType<R>[]>;
 }}
 */
export const asyncAll =
	(...fns) =>
	(...args) =>
		Promise.all(fns.map(call(...args)));

/**
 * Creates array predicate from item predicate.
 * New predicate returns true if and only if item predicate returns true for each array item
 *
 * @type {<T>(predicate: (item: T, list: T[], index: number) => boolean) => <S extends T>(list: S[]) => boolean}
 */
export const every = (predicate) => (list) => list.every(predicate);

/**
 * Creates array predicate from item predicate.
 * New predicate returns true if and only if item predicate returns true for any of array items
 *
 * @type {<T>(predicate: (item: T, list: T[], index: number) => boolean) => <S extends T>(list: S[]) => boolean}
 */
export const some = (predicate) => (list) => list.some(predicate);

/**
 * Checks if value is not null or undefined
 */
export const isLoaded = (value) => value != null;

/**
 * Maps `value` with `mapper`
 * `value` could be an array or an single value.
 *
 * If `value` is an array the vmap returns napped array
 * otherwise vamap returns single mapped value
 *
 * @type {{
 *  <T, S>(mapper: (item: T, list: T[] | null, index: number) => S): <V extends T|T[]>(value: V) => V extends T[] ? S[] : S
 * }}
 */
export const vmap = (mapper) => (value) =>
	Array.isArray(value) ? value.map(mapper) : mapper(value, null, 0);

/** Calls fn function when value is resolved.
 * If value is not a promise the fn will be called immediately.
 *
 * @type {<T, R>(fn: (value: T|Promise<T>) => R, value: T | Promise<T>) => V extends Promise<T> ? Promise<R> : R}
 * */
export const callWhenReady = (fn, value) => (isPromise(value) ? value.then(fn) : fn(value));

export const resolve = (value) => Promise.resolve(value);

export const reject = (error) => Promise.reject(error);
