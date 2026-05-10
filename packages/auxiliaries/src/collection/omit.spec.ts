import { omit } from "./omit";

describe("omit", () => {
    it("should behave like pickExcept", () => {
        const user = { name: "Alice", age: 30, email: "alice@example.com" };
        expect(omit(user, ["email"])).toEqual({ name: "Alice", age: 30 });
    });

    it("should return an empty object for undefined source", () => {
        expect(omit(undefined as { a: string } | undefined, ["a"])).toEqual({});
    });
});
