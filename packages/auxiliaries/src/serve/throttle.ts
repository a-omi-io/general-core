/**
 * Returns a throttled version of the input function that can be used to update React state.
 * @param func The function to throttle.
 * @param ms The minimum time in milliseconds that must elapse between calls to the throttled function.
 * @returns A throttled version of the input function.
 */
export function throttle<T extends (...args: Array<any>) => void>(
    func: T,
    ms: number
): (...args: Parameters<T>) => void {
    let isThrottled = false,
        savedArgs: Parameters<T> | null = null,
        savedThis: any = null;

    function wrapper(this: any, ...args: Parameters<T>) {
        if (isThrottled) {
            savedArgs = args;
            savedThis = this;
            return;
        }

        func.apply(this, args);

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}
