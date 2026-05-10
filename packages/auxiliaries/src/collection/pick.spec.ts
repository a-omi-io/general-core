import { pick } from "./pick";

describe("pick", () => {
    it("should return an empty object when source is undefined", () => {
        expect(
            pick(undefined as { a: number; b: number } | undefined, ["a", "b"])
        ).toEqual({});
    });

    it("should pick only existing own properties", () => {
        const user = {
            name: "Alice",
            age: 30,
            email: "alice@example.com",
        };
        expect(pick(user, ["name", "email"])).toEqual({
            name: "Alice",
            email: "alice@example.com",
        });
    });

    it("should ignore keys missing on the object", () => {
        const user = { name: "Alice" };
        expect(pick(user, ["name", "age" as keyof typeof user])).toEqual({
            name: "Alice",
        });
    });

    it("should not mutate the original object", () => {
        const user = { name: "Alice", age: 30 };
        const result = pick(user, ["name"]);
        expect(result).not.toBe(user);
        expect(user).toEqual({ name: "Alice", age: 30 });
        expect(result).toEqual({ name: "Alice" });
    });

    it("should return empty object when keys array is empty", () => {
        const user = { name: "Alice" };
        expect(pick(user, [])).toEqual({});
    });
});
