import { clamp } from "./clamp";

describe("clamp function", () => {
    test("should not alter a value within the range", () => {
        expect(clamp(5, 1, 10)).toBe(5);
    });

    test("should clamp a value that is less than the minimum of the range", () => {
        expect(clamp(-3, 0, 10)).toBe(0);
    });

    test("should clamp a value that is greater than the maximum of the range", () => {
        expect(clamp(15, 1, 10)).toBe(10);
    });

    test("should handle the case where the min and max values are the same", () => {
        expect(clamp(5, 3, 3)).toBe(3);
    });

    test("should handle negative ranges correctly", () => {
        expect(clamp(-5, -10, -1)).toBe(-5);
    });

    test("should handle the case where the value is exactly at the range boundary", () => {
        expect(clamp(10, 1, 10)).toBe(10);
        expect(clamp(1, 1, 10)).toBe(1);
    });

    test("should handle swapped range values correctly", () => {
        expect(clamp(5, 10, 1)).toBe(5);
    });
});
