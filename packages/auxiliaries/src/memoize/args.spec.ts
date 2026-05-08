import { memoizeArgs, memoizeSimpleTypeArg } from "./args";

describe("memoize/args", () => {
    describe("memoizeArgs", () => {
        it("should memoize the results of a function based on its arguments", () => {
            const mockFn = jest.fn((x: number, y: number) => x + y);
            const memoizedFn = memoizeArgs(mockFn);

            expect(memoizedFn(2, 3)).toBe(5);
            expect(memoizedFn(2, 3)).toBe(5); // Should return cached result
            expect(mockFn).toHaveBeenCalledTimes(1);

            expect(memoizedFn(3, 2)).toBe(5); // Different order of arguments
            expect(mockFn).toHaveBeenCalledTimes(2);
        });

        it("should handle string arguments", () => {
            const mockFn = jest.fn((s: string) => s.toUpperCase());
            const memoizedFn = memoizeArgs(mockFn);

            expect(memoizedFn("hello")).toBe("HELLO");
            expect(memoizedFn("hello")).toBe("HELLO"); // Should return cached result
            expect(mockFn).toHaveBeenCalledTimes(1);

            expect(memoizedFn("HELLO")).toBe("HELLO"); // Case sensitivity
            expect(mockFn).toHaveBeenCalledTimes(2);
        });
    });

    describe("memoizeSimpleTypeArg", () => {
        it("should memoize the result of a function based on its argument", () => {
            const mockFn = jest.fn((x: number) => x * 2);
            const memoizedFn = memoizeSimpleTypeArg(mockFn);

            expect(memoizedFn(2)).toBe(4);
            expect(memoizedFn(2)).toBe(4); // Should return cached result
            expect(mockFn).toHaveBeenCalledTimes(1);

            expect(memoizedFn(3)).toBe(6); // Different argument
            expect(mockFn).toHaveBeenCalledTimes(2);
        });

        it("should handle object arguments", () => {
            const mockFn = jest.fn(
                (obj: { a: number; b: number }) => obj.a + obj.b
            );
            const memoizedFn = memoizeSimpleTypeArg(mockFn);
            const exObj = { a: 2, b: 3 };

            expect(memoizedFn(exObj)).toBe(5);
            expect(memoizedFn(exObj)).toBe(5); // Should return cached result
            expect(mockFn).toHaveBeenCalledTimes(1);

            expect(memoizedFn({ a: 3, b: 2 })).toBe(5); // Different object with same properties
            expect(mockFn).toHaveBeenCalledTimes(2);

            expect(memoizedFn({ a: 2, b: 4 })).toBe(6); // Different object with different properties
            expect(mockFn).toHaveBeenCalledTimes(3);
        });
    });
});
