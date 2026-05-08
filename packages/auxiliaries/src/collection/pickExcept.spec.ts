import { pickExcept } from "./pickExcept";

describe("pickExcept", () => {
    test("should return an empty object if the input object is undefined", () => {
        const result = pickExcept(undefined, ["name", "age"]);
        expect(result).toEqual({});
    });

    test("should return an object with all properties when no properties are excluded", () => {
        const user = { name: "Alice", age: 30, email: "alice@example.com" };
        const result = pickExcept(user, []);
        expect(result).toEqual(user);
    });

    test("should return an object with the specified property excluded", () => {
        const user = { name: "Alice", age: 30, email: "alice@example.com" };
        const result = pickExcept(user, ["email"]);
        expect(result).toEqual({ name: "Alice", age: 30 });
    });

    test("should exclude multiple properties when specified", () => {
        const user = { name: "Alice", age: 30, email: "alice@example.com" };
        const result = pickExcept(user, ["email", "age"]);
        expect(result).toEqual({ name: "Alice" });
    });

    test("should not modify the original object", () => {
        const user = { name: "Alice", age: 30, email: "alice@example.com" };
        const result = pickExcept(user, ["email"]);
        expect(result).not.toBe(user); // Ensure a new object is returned
        expect(user).toEqual({
            name: "Alice",
            age: 30,
            email: "alice@example.com",
        }); // Original object should remain unchanged
    });

    test("should handle an empty object correctly", () => {
        const result = pickExcept({} as { name: string }, ["name"]);
        expect(result).toEqual({});
    });

    test("should handle an object with one property being excluded", () => {
        const user = { name: "Alice" };
        const result = pickExcept(user, ["name"]);
        expect(result).toEqual({});
    });

    test("should handle complex objects", () => {
        const user = {
            name: "Alice",
            address: { city: "Wonderland", zip: "12345" },
            age: 30,
        };
        const result = pickExcept(user, ["address"]);
        expect(result).toEqual({ name: "Alice", age: 30 });
    });

    test("should exclude properties correctly with nested structures", () => {
        const user = {
            name: "Alice",
            details: { age: 30, email: "alice@example.com" },
        };
        const result = pickExcept(user, ["details"]);
        expect(result).toEqual({ name: "Alice" });
    });

    test("should handle excluding properties from an object with mixed types (e.g., string, number)", () => {
        const obj = { name: "Alice", age: 30, isActive: true };
        const result = pickExcept(obj, ["isActive"]);
        expect(result).toEqual({ name: "Alice", age: 30 });
    });
});
