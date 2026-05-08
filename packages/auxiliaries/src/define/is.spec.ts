/* eslint-disable max-lines */
import { isDefinedAndNotNull, isValueNonDefined } from "./is";

describe("Define: is", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    describe("isDefinedAndNotNull", () => {
        test("should return false for undefined", () => {
            expect(isDefinedAndNotNull(undefined)).toBe(false);
        });

        test("should return false for null", () => {
            expect(isDefinedAndNotNull(null)).toBe(false);
        });

        test("should return false for NaN", () => {
            expect(isDefinedAndNotNull(NaN)).toBe(false);
        });

        test("should return true for a valid number", () => {
            expect(isDefinedAndNotNull(123)).toBe(true);
            expect(isDefinedAndNotNull(0)).toBe(true); // Ensure 0 is considered valid
            expect(isDefinedAndNotNull(-123)).toBe(true); // Negative numbers should also be valid
        });

        test("should return true for a valid string", () => {
            expect(isDefinedAndNotNull("hello")).toBe(true);
            expect(isDefinedAndNotNull("")).toBe(true); // Empty string is defined and not null
        });

        test("should return true for a valid boolean", () => {
            expect(isDefinedAndNotNull(true)).toBe(true);
            expect(isDefinedAndNotNull(false)).toBe(true);
        });

        test("should return true for an object", () => {
            expect(isDefinedAndNotNull({})).toBe(true);
            expect(isDefinedAndNotNull({ key: "value" })).toBe(true);
        });

        test("should return true for an array", () => {
            expect(isDefinedAndNotNull([])).toBe(true);
            expect(isDefinedAndNotNull([1, 2, 3])).toBe(true);
        });

        test("should return true for a valid function", () => {
            expect(isDefinedAndNotNull(() => {})).toBe(true);
        });

        test("should return true for a valid symbol", () => {
            expect(isDefinedAndNotNull(Symbol("test"))).toBe(true);
        });

        test("should return true for a BigInt", () => {
            expect(isDefinedAndNotNull(BigInt(123))).toBe(true);
        });
    });

    describe("isValueNonDefined", () => {
        test("should return true for undefined", () => {
            expect(isValueNonDefined(undefined)).toBe(true);
        });

        test("should return true for null", () => {
            expect(isValueNonDefined(null)).toBe(true);
        });

        test("should return false for non-null and non-undefined values", () => {
            expect(isValueNonDefined(0)).toBe(false);
            expect(isValueNonDefined("")).toBe(false);
            expect(isValueNonDefined(false)).toBe(false);
            expect(isValueNonDefined([])).toBe(false);
            expect(isValueNonDefined({})).toBe(false);
        });

        test("should return true for NaN when shouldCheckNaN is true (default)", () => {
            expect(isValueNonDefined(NaN)).toBe(true);
        });

        test("should return false for NaN when shouldCheckNaN is false", () => {
            expect(isValueNonDefined(NaN, false)).toBe(false);
        });

        test("should return false for valid numbers, even if shouldCheckNaN is true", () => {
            expect(isValueNonDefined(42)).toBe(false);
            expect(isValueNonDefined(0)).toBe(false);
        });

        test("should handle edge cases gracefully", () => {
            expect(isValueNonDefined(Symbol("test"))).toBe(false);
            expect(isValueNonDefined(BigInt(123))).toBe(false);
            expect(isValueNonDefined(() => {})).toBe(false);
        });
    });

    describe("isBrowser", () => {
        beforeAll(() => {
            const jsdom = require("jsdom");
            const { JSDOM } = jsdom;

            const { window } = new JSDOM(
                "<!doctype html><html><body></body></html>",
                {
                    url: "http://localhost",
                }
            );

            global.window = window;
            global.document = window.document;
            // @ts-expect-error
            global.navigator = {
                userAgent: "node.js",
            };
        });
        it("should return true in a browser environment", async () => {
            const { isBrowser } = await import("./is");

            expect(isBrowser()).toBe(true);
        });

        it("should return false outside of a browser environment", async () => {
            // @ts-expect-error
            global.window = undefined;
            const { isBrowser } = await import("./is");

            expect(isBrowser()).toBe(false);
        });
    });

    describe("isDOMSupported", () => {
        beforeAll(() => {
            const jsdom = require("jsdom");
            const { JSDOM } = jsdom;

            const { window } = new JSDOM(
                "<!doctype html><html><body></body></html>",
                {
                    url: "http://localhost",
                }
            );

            global.window = window;
            global.document = window.document;
            // @ts-expect-error
            global.navigator = {
                userAgent: "node.js",
            };
        });
        it("should return true in a browser environment with DOM APIs", async () => {
            const { isDOMSupported } = await import("./is");
            expect(isDOMSupported()).toBe(true);
        });

        it("should return false in a browser environment without DOM APIs", async () => {
            // Mock the window object
            const window = {
                document: {},
            };
            // @ts-expect-error
            global.window = window;
            const { isDOMSupported } = await import("./is");

            expect(isDOMSupported()).toBe(false);
        });

        it("should return false outside of a browser environment", async () => {
            // @ts-expect-error
            global.window = undefined;
            const { isDOMSupported } = await import("./is");

            expect(isDOMSupported()).toBe(false);
        });
    });
});
