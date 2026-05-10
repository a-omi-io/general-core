import { debounce } from "./debounce";

describe("debounce", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it("should return a debounced function", () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);

        expect(typeof debouncedFn).toBe("function");
    });

    it("should invoke the function only after the delay since the last call", () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();
        debouncedFn();
        debouncedFn();

        expect(mockFn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(99);
        expect(mockFn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should pass the latest arguments to the underlying function", () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn("a");
        debouncedFn("b");
        debouncedFn("c");

        jest.advanceTimersByTime(100);

        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith("c");
    });

    it('should preserve the "this" context of the original function', () => {
        const mockObj = {
            mockFn: jest.fn(),
        };

        const debouncedFn = debounce(mockObj.mockFn, 100);

        debouncedFn.call(mockObj);
        debouncedFn.call(mockObj);

        jest.advanceTimersByTime(100);

        expect(mockObj.mockFn).toHaveBeenCalledTimes(1);
        expect(mockObj.mockFn.mock.instances[0]).toBe(mockObj);
    });
});
