import Dictionary from "./dictionary";
import { compose } from "../fn";

describe("Dictionary", () => {
	it("should create a Dictionary", () => {
		const d = Dictionary();
		expect(d.add).toBeInstanceOf(Function);
		expect(d.get).toBeInstanceOf(Function);
	});

	it("should be possible to store and get value for single key", () => {
		const key = Symbol("Key");
		const value = Symbol("Value");

		const d = Dictionary();

		d.add([key], value);

		expect(d.get([key])).toBe(value);
	});

	it("should be return undefined for the different key", () => {
		const key = Symbol("Key");
		const otherKey = Symbol("Key");
		const value = Symbol("Value");

		const d = Dictionary();

		d.add([key], value);

		expect(d.get([otherKey])).toBeUndefined();
	});

	it("should be possible to store and get value for two keys ", () => {
		const key1 = Symbol("Key1");
		const key2 = Symbol("Key2");
		const value = Symbol("Value");

		const d = Dictionary();

		d.add([key1, key2], value);

		expect(d.get([key1, key2])).toBe(value);
		expect(d.get([key2, key1])).toBeUndefined();
	});

	it("should correctly works for sub-set of tokens", () => {
		const key1 = Symbol("Key1");
		const key2 = Symbol("Key2");
		const value1 = Symbol("Value");
		const value2 = Symbol("Value");

		const d = Dictionary();

		d.add([key1, key2], value1);
		d.add([key1], value2);

		expect(d.get([key1, key2])).toBe(value1);
		expect(d.get([key1])).toBe(value2);
	});

	it("should work with functions", () => {
		const d = Dictionary();
		const mCompose = (...fns) => {
			const f = d.get(fns);
			if (f) return f;
			const g = compose(...fns);
			d.add(fns, g);
			return g;
		};

		const f = (a, b) => a + b;
		const g = (a) => a * 2;
		const h = (a) => a + 10;

		const cF = mCompose(h, g, f);
		expect(mCompose(h, g, f)).toBe(cF);
	});
});
