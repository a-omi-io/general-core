import { isLastIndexOfArray } from "./array";

describe("array", () => {
    describe("isLastIndexOfArray", () => {
        it("should return true if the index is the last index of the array", () => {
            expect(isLastIndexOfArray([1, 2, 3], 2)).toBe(true);
            expect(isLastIndexOfArray(["a", "b", "c"], 2)).toBe(true);
            expect(isLastIndexOfArray(["foo"], 0)).toBe(true);
        });

        it("should return false if the index is not the last index of the array", () => {
            expect(isLastIndexOfArray([1, 2, 3], 1)).toBe(false);
            expect(isLastIndexOfArray(["a", "b", "c"], 1)).toBe(false);
        });

        it("throws an error if the index is out of range and the throws parameter is true", () => {
            expect(() => isLastIndexOfArray([], 0, true)).toThrow(
                "Index out of range"
            );
            expect(() => isLastIndexOfArray([1, 2, 3], -1, true)).toThrow(
                "Index out of range"
            );
            expect(() => isLastIndexOfArray([1, 2, 3], 3, true)).toThrow(
                "Index out of range"
            );
        });

        it("returns false if the index is out of range and the throws parameter is false", () => {
            expect(isLastIndexOfArray(["foo"], 1, false)).toBe(false);
            expect(isLastIndexOfArray(["foo"], 3)).toBe(false);
            expect(isLastIndexOfArray([1, 2, 3], 3, false)).toBe(false);
        });
    });
});
