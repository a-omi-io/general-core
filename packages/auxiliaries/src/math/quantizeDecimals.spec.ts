import {
    quantizeToDecimals,
    type DecimalRoundingMode,
} from "./quantizeDecimals";
import { roundToDecimalPlaces } from "./round";

describe("quantizeToDecimals", () => {
    it("defaults to rounding with zero decimals", () => {
        expect(quantizeToDecimals(1.6)).toBe(2);
        expect(quantizeToDecimals(-1.6)).toBe(-2);
    });

    it("rounds to decimal places like roundToDecimalPlaces", () => {
        expect(
            quantizeToDecimals(3.14159, { mode: "round", decimals: 2 })
        ).toBe(3.14);
        expect(roundToDecimalPlaces(3.14159, 2)).toBe(3.14);
    });

    it.each<[number, DecimalRoundingMode, number, number]>([
        [1.234, "floor", 2, 1.23],
        [1.234, "ceil", 2, 1.24],
        [-1.234, "floor", 2, -1.24],
        [-1.234, "ceil", 2, -1.23],
    ])(
        "mode %s with decimals applies correctly",
        (value, mode, decimals, expected) => {
            expect(quantizeToDecimals(value, { mode, decimals })).toBe(
                expected
            );
        }
    );
});
