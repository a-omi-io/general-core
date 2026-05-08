import { throttle } from "./throttle";

describe("throttle", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it("should return a throttled version of the input function", () => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 100);

        expect(typeof throttledFn).toBe("function");
    });

    it("should throttle the function calls by the given time", () => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 100);

        throttledFn();
        throttledFn(); // Ignored
        throttledFn();

        expect(mockFn).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(100);

        expect(mockFn).toHaveBeenCalledTimes(2);

        jest.advanceTimersByTime(100);

        expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it("should call the function with the latest arguments after the throttle time", () => {
        const mockFn = jest.fn();
        const throttledFn = throttle(mockFn, 100);

        throttledFn("arg1");
        throttledFn("arg2"); // Ignored
        throttledFn("arg3");

        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith("arg1");

        jest.advanceTimersByTime(100);

        expect(mockFn).toHaveBeenCalledTimes(2);
        expect(mockFn).toHaveBeenCalledWith("arg3");
    });

    it('should preserve the "this" context of the original function', () => {
        const mockObj = {
            mockFn: jest.fn(),
        };

        const throttledFn = throttle(mockObj.mockFn, 100);

        throttledFn.call(mockObj);
        throttledFn.call(mockObj);

        expect(mockObj.mockFn).toHaveBeenCalledTimes(1);
        expect(mockObj.mockFn.mock.instances[0]).toBe(mockObj);

        jest.advanceTimersByTime(100);

        expect(mockObj.mockFn).toHaveBeenCalledTimes(2);
        expect(mockObj.mockFn.mock.instances[1]).toBe(mockObj);
    });
});
