import {
	asAsync,
	asyncAll,
	call,
	callWith,
	compose,
	ensureFunc,
	get,
	idX,
	isEmpty,
	isFunc,
	isPromise,
	mapErrors,
	merge,
	mergeAll,
	mergeProps,
	promisify,
	skipIf,
	summ,
	vmap,
} from ".";

class SpecificException extends Error {
	constructor(message, code = null) {
		super(message);
		this.code = code;
		this.name = SpecificException;
	}
}

const failedFn = () => Promise.reject(new Error("Specific error occurs!"));

describe("idX helper tests", () => {
	it("should return the same value", () => {
		expect(idX(3)).toEqual(3);
	});
});

describe("Call helper tests", () => {
	it("should call test function", () => {
		const testFn = jest.fn().mockImplementationOnce((a, b) => parseInt(a, 10) + parseInt(b, 10));
		expect(call(2, 2)(testFn)).toEqual(4);
		expect(testFn).toHaveBeenCalledTimes(1);
	});
});

describe("isPromise helper tests", () => {
	it("should check is element a Promise or not.", () => {
		const pendingPromise = new Promise(() => {});
		expect(isPromise(pendingPromise)).toEqual(true);
	});
});

describe("isFunc helper tests", () => {
	it("should check is element a function or not.", () => {
		const testFn = (a, b) => parseInt(a, 10) + parseInt(b, 10);
		expect(isFunc(testFn)).toEqual(true);
	});
});

describe("ensureFunc helper tests", () => {
	it("should ensure that element is a function.", () => {
		const testFn = (a, b) => parseInt(a, 10) + parseInt(b, 10);
		const ensured = ensureFunc(testFn, {});
		expect(ensured).toBeInstanceOf(Function);
	});

	it("should return default value if element isn't a function.", () => {
		const notFn = "test string";
		const ensured = ensureFunc(notFn, {});
		expect(ensured).toBeInstanceOf(Object);
	});
});

describe("Compose func tests", () => {
	it("should compose two functions.", () => {
		const f = (x) => x + 1;
		const g = (x) => x * 2;
		const h = compose(f, g);

		expect(h).toBeInstanceOf(Function);
		expect(h(2)).toBe(5);
	});
});

describe("mapErrors", () => {
	it("Should map error with errorsMapper.", async () => {
		const specificExceptionMapper = (error) =>
			error.message === "Specific error occurs!"
				? new SpecificException(error.message, error.code)
				: null;

		const error = await failedFn().catch(mapErrors(specificExceptionMapper)).catch(idX);

		expect(error).toBeInstanceOf(SpecificException);
	});
});

describe("skipIf func tests", () => {
	it("should call only original func with correct data.", () => {
		const testData = { status: true };
		const notSuccessfull = (data) => data.status === false;
		const originalFn = jest.fn().mockImplementationOnce((params) => params.status);
		const altFn = jest.fn().mockImplementationOnce((params) => params.status);

		skipIf(notSuccessfull, altFn)(originalFn)(testData);

		expect(originalFn).toHaveBeenCalledTimes(1);
		expect(altFn).toHaveBeenCalledTimes(0);
	});
	it("should call alternative func with correct data.", () => {
		const testData = { status: false };
		const notSuccessfull = (data) => data.status === false;
		const originalFn = jest.fn().mockImplementationOnce((params) => params.status);
		const altFn = jest.fn().mockImplementationOnce((params) => params.status);

		skipIf(notSuccessfull, altFn)(originalFn)(testData);

		expect(originalFn).toHaveBeenCalledTimes(0);
		expect(altFn).toHaveBeenCalledTimes(1);
	});
});

describe("isEmpty func tests", () => {
	it("should check positive value.", () => {
		const positiveValue = 5;

		expect(isEmpty(positiveValue)).toEqual(false);
	});

	it("should check null value.", () => {
		const emptyValue = null;

		expect(isEmpty(emptyValue)).toEqual(true);
	});
});

describe("mergeAll func tests", () => {
	it("should merge two objects.", () => {
		const obj1 = { status: true };
		const obj2 = { payload: { message: "test message" } };
		const merged = {
			status: true,
			payload: { message: "test message" },
		};
		expect(mergeAll([obj1, obj2])).toEqual(merged);
	});
});

describe("mergeProps func tests", () => {
	it("should merge two Promises results.", async () => {
		const prom1 = Promise.resolve({ status: true });
		const prom2 = Promise.resolve({ payload: { message: "test message" } });
		const merged = {
			status: true,
			payload: { message: "test message" },
		};
		expect(await mergeProps(prom1, prom2)).toEqual(merged);
	});

	it("should merge two objects.", () => {
		const obj1 = { status: true };
		const obj2 = { payload: { message: "test message" } };
		const merged = {
			status: true,
			payload: { message: "test message" },
		};
		expect(mergeProps(obj1, obj2)).toEqual(merged);
	});
});

describe("callWith func tests", () => {
	it("should call test function with provided arguments.", () => {
		const testFunc = jest.fn().mockImplementationOnce((...args) => args);
		const testArgumenhts = ["test message", { data: "test data" }];
		const result = callWith(...testArgumenhts)(testFunc);

		expect(testFunc).toHaveBeenCalledTimes(1);
		expect(result).toEqual(testArgumenhts);
	});
});

describe("promisify func tests", () => {
	it("should promisify the function.", () => {
		const testFunc = jest.fn().mockImplementationOnce((...args) => args);
		const promisified = promisify(testFunc);
		const testParams = [123, "test message"];
		const resultAsPromise = promisified(...testParams);

		expect(resultAsPromise).toBeInstanceOf(Promise);
		expect(testFunc).toHaveBeenCalledTimes(1);
	});
});

describe("asAsync func tests", () => {
	it("should call function inside Promise.", () => {
		const testFunc = jest.fn().mockImplementationOnce((...args) => args);
		const testParams = [123, "test message"];
		const asyncResult = asAsync(testFunc, ...testParams);

		expect(asyncResult).toBeInstanceOf(Promise);
		expect(testFunc).toHaveBeenCalledTimes(1);
	});
});

describe("merge func tests", () => {
	it("should merge few objects in one.", () => {
		const obj1 = { message: "test message" };
		const obj2 = { status: "success" };
		const obj3 = { payload: { id: "sd6fds7fsd5f7s5f7c7vds7v8dvd6v7d6" } };
		const merged = {
			message: "test message",
			status: "success",
			payload: { id: "sd6fds7fsd5f7s5f7c7vds7v8dvd6v7d6" },
		};

		expect(merge(obj1, obj2, obj3)).toEqual(merged);
	});
});

describe("summ func tests", () => {
	it("should summ two numbers.", () => {
		expect(summ(2, 2)).toEqual(4);
	});
});

describe("get func tests", () => {
	it("should get data by index.", () => {
		const dataContainer = ["first test string", "second test string"];
		expect(get(0)(dataContainer)).toEqual("first test string");
		expect(get(1)(dataContainer)).toEqual("second test string");
	});
	it("should get data by fieldName.", () => {
		const dataContainer = {
			status: "success",
			payload: { accessToken: "d677d67dv67d6vd76vd7f6d76f7d6fd7f6" },
		};
		expect(get("status")(dataContainer)).toEqual("success");
		expect(get("payload")(dataContainer)).toEqual({
			accessToken: "d677d67dv67d6vd76vd7f6d76f7d6fd7f6",
		});
	});
});

describe("asyncAll func tests", () => {
	it("should call few async functions and wait their results.", async () => {
		const getResultsStorage = () => {
			const storage = new Map();
			return {
				get: (key) => storage.get(key),
				set: (key, val) => storage.set(key, val),
			};
		};
		const storage = getResultsStorage();
		const testParams = [{ success: true }, storage];
		const async1 = jest
			.fn()
			.mockImplementationOnce(
				async (payload) => storage.set("async1", payload.success) && Promise.resolve(true),
			);
		const async2 = jest
			.fn()
			.mockImplementationOnce(
				async (payload) => storage.set("async2", payload.success) && Promise.resolve(true),
			);

		await asyncAll(async1, async2)(...testParams);

		expect(async1).toHaveBeenCalledTimes(1);
		expect(storage.get("async1")).toEqual(true);
		expect(async2).toHaveBeenCalledTimes(1);
		expect(storage.get("async2")).toEqual(true);
	});
});

describe("vmap", () => {
	it("creates a function", () => {
		expect(vmap((x) => x + 1)).toBeInstanceOf(Function);
	});

	it("maps single value to single value", () => {
		expect(vmap((x) => x + 1)(1)).toBe(2);
	});

	it("maps an array to an array", () => {
		const a = [1, 2, 3, 4];

		/** @type {(x: number) => number} */
		const next = (x) => x + 1;

		const mapToNext = vmap(next);

		/** @type {number[]} */
		const b = mapToNext(a);

		expect(b).toEqual([2, 3, 4, 5]);
	});
});
