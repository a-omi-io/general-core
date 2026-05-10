import { approxEqual, inverseLerp, lerp, remap } from "./interpolation";

describe("lerp", () => {
    it("interpolates at t=0 and t=1", () => {
        expect(lerp(0, 10, 0)).toBe(0);
        expect(lerp(0, 10, 1)).toBe(10);
    });

    it("interpolates at midpoint", () => {
        expect(lerp(4, 8, 0.25)).toBe(5);
    });
});

describe("inverseLerp", () => {
    it("maps endpoints to 0 and 1", () => {
        expect(inverseLerp(0, 10, 0)).toBe(0);
        expect(inverseLerp(0, 10, 10)).toBe(1);
        expect(inverseLerp(0, 10, 5)).toBe(0.5);
    });

    it("returns 0 when a equals b", () => {
        expect(inverseLerp(3, 3, 42)).toBe(0);
    });
});

describe("remap", () => {
    it("maps from one interval to another", () => {
        expect(remap(50, 0, 100, 0, 1)).toBe(0.5);
        expect(remap(0, 0, 10, 100, 200)).toBe(100);
        expect(remap(10, 0, 10, 100, 200)).toBe(200);
    });

    it("returns outMin when input range collapses", () => {
        expect(remap(5, 2, 2, 100, 200)).toBe(100);
    });
});

describe("approxEqual", () => {
    it("compares within epsilon", () => {
        expect(approxEqual(1, 1 + 1e-11)).toBe(true);
        expect(approxEqual(0, 0.001, 0.01)).toBe(true);
        expect(approxEqual(0, 0.1, 0.01)).toBe(false);
    });
});
