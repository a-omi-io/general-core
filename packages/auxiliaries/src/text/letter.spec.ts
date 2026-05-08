import { capitalizeFirstLetter } from "./letter";

describe("text/letter", () => {
    describe("capitalizeFirstLetter function", () => {
        test("capitalizes the first letter of a string", () => {
            expect(capitalizeFirstLetter("hello")).toBe("Hello");
            expect(capitalizeFirstLetter("world")).toBe("World");
            expect(capitalizeFirstLetter("hello world")).toBe("Hello world");
        });

        test("converts the rest of the string to lowercase when the second argument is true", () => {
            expect(capitalizeFirstLetter("HELLO WORLD", true)).toBe(
                "Hello world"
            );
            expect(capitalizeFirstLetter("jAVASCRIPT iS fUN", true)).toBe(
                "Javascript is fun"
            );
        });

        test("returns the input string when it is not a string or empty", () => {
            // @ts-ignore
            expect(capitalizeFirstLetter(null)).toBe(null);
            // @ts-ignore
            expect(capitalizeFirstLetter(undefined)).toBe(undefined);
            expect(capitalizeFirstLetter("")).toBe("");
            // @ts-ignore
            expect(capitalizeFirstLetter(123)).toBe(123);
        });
    });
});
