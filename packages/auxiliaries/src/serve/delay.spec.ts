import { delay } from "./delay";

describe("serve/delay", () => {
    describe("delay function", () => {
        test("resolves with undefined after a specified delay", async () => {
            const delayTime = 1000; // in milliseconds
            const result = await delay(delayTime);
            expect(result).toBeUndefined();
        });

        test("resolves with a specified result after a specified delay", async () => {
            const delayTime = 500; // in milliseconds
            const expectedResult = "hello";
            const result = await delay(delayTime, expectedResult);
            expect(result).toBe(expectedResult);
        });

        test("resolves after a delay of 0 milliseconds", async () => {
            const delayTime = 0;
            const result = await delay(delayTime);
            expect(result).toBeUndefined();
        });

        test("rejects if an invalid delay time is provided", async () => {
            const delayTime = -100; // negative delay time is invalid
            await expect(delay(delayTime)).rejects.toThrow();
        });
    });
});
