import { toStr } from "./toStr";

describe("toStr", () => {
	it.each([
		[1],
		[null],
		[undefined],
		[{}],
		[new Date()],
		[[1, 2, 3]],
		["some string"],
		[""],
		[false],
		[true],
	])("it returns default string representation for %j", (value) => {
		expect(toStr(value)).toBe(`${value}`);
	});

	it("returns Symbol.toString for Symbol", () => {
		expect(toStr(Symbol("s"))).toBe(Symbol("s").toString());
	});
});
