import { measureExecutionTime } from "./performance";
import { echo } from "../log/echo";

jest.mock("../log/echo", () => ({
    echo: jest.fn(),
}));

describe("measureExecutionTime", () => {
    let performanceNowMock: jest.SpyInstance;

    beforeEach(() => {
        // Mock performance.now() to return a fixed value
        performanceNowMock = jest
            .spyOn(performance, "now")
            .mockImplementation(() => 1000);
    });

    afterEach(() => {
        // Restore the original performance.now() after each test
        performanceNowMock.mockRestore();
        jest.clearAllMocks(); // Clear mock calls
    });

    test("should return the result of the function call", () => {
        const mockFunc = jest.fn().mockReturnValue("testResult");

        const result = measureExecutionTime(mockFunc);

        expect(result).toBe("testResult");
        expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    test("should correctly log the execution time", () => {
        const mockFunc = jest.fn().mockReturnValue("testResult");

        // Mock the performance.now() to simulate the passage of time
        performanceNowMock.mockImplementationOnce(() => 1000); // Start time
        performanceNowMock.mockImplementationOnce(() => 1020); // End time (2ms duration)

        measureExecutionTime(mockFunc);

        // Check if the echo function was called with the correct time
        expect(echo).toHaveBeenCalledWith(
            "Execution time: 20.00ms (0.02000000s)"
        );
    });

    test("should handle a function that takes no time (0ms)", () => {
        const mockFunc = jest.fn().mockReturnValue("testResult");

        performanceNowMock.mockImplementationOnce(() => 1000); // Start time
        performanceNowMock.mockImplementationOnce(() => 1000); // End time (no time elapsed)

        measureExecutionTime(mockFunc);

        expect(echo).toHaveBeenCalledWith(
            "Execution time: 0.00ms (0.00000000s)"
        );
    });

    test("should handle a function with arguments and return value correctly", () => {
        const mockFunc = jest
            .fn()
            .mockImplementation((a: number, b: number) => a + b);

        const result = measureExecutionTime(mockFunc, 2, 3);

        expect(result).toBe(5); // The result of 2 + 3
        expect(mockFunc).toHaveBeenCalledWith(2, 3);
    });
});
