import { wrapPeriodic } from "./wrapPeriodic";

describe("wrapPeriodic", () => {
    it("wraps values into [0, period)", () => {
        expect(wrapPeriodic(360, 360)).toBe(0);
        expect(wrapPeriodic(721, 360)).toBe(1);
        expect(wrapPeriodic(-30, 360)).toBe(330);
    });

    it("leaves in-range values unchanged", () => {
        expect(wrapPeriodic(0, 360)).toBe(0);
        expect(wrapPeriodic(180.5, 360)).toBe(180.5);
    });

    it("rejects non-positive or non-finite period", () => {
        expect(() => wrapPeriodic(1, 0)).toThrow(RangeError);
        expect(() => wrapPeriodic(1, -1)).toThrow(RangeError);
        expect(() => wrapPeriodic(1, Number.NaN)).toThrow(RangeError);
        expect(() => wrapPeriodic(1, Number.POSITIVE_INFINITY)).toThrow(
            RangeError
        );
    });
});
