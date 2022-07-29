import memo from ".";
import { compose } from "../fn";

describe("memo", () => {
	it("should memoize function of one argument", () => {
		const fn = jest.fn((x) => x + 1);
		const mFn = memo(fn);

		expect(mFn(2)).toBe(3);
		expect(mFn(2)).toBe(3);

		expect(fn).toHaveBeenCalledTimes(1);
	});

	it("should work with functions", () => {
		const mCompose = memo(compose);
		const f = (a, b) => a + b;
		const g = (a) => a * 2;
		const h = (a) => a + 10;

		const cF = mCompose(h, g, f);
		expect(mCompose(h, g, f)).toBe(cF);
	});
});

describe("memo1", () => {
	it("should work for one argument", () => {
		const fn = jest.fn((x) => (y) => x + y);
		const mFn = memo.n(1)(fn);

		const add2 = mFn(2);
		expect(mFn(2)).toBe(add2);

		expect(fn).toHaveBeenCalledTimes(1);
	});

	it("should work for first argument only", () => {
		const fn = jest.fn((x, y) => (z) => x + y + z);
		const mFn = memo.n(1)(fn);

		const add5 = mFn(2, 3);
		expect(mFn(2, 4)).toBe(add5);

		expect(fn).toHaveBeenCalledTimes(1);
	});
});
