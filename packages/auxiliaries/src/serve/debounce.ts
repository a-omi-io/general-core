/**
 * Returns a debounced version of the input function. The wrapped function runs
 * after `ms` milliseconds have elapsed since the last call.
 *
 * @param func - The function to debounce.
 * @param ms - Delay in milliseconds after the last call before invoking `func`.
 * @returns A debounced function with the same parameters as `func`.
 */
export function debounce<T extends (...args: Array<any>) => void>(
    func: T,
    ms: number
): (...args: Parameters<T>) => void {
    let timerId: ReturnType<typeof setTimeout> | null = null;
    let savedArgs: Parameters<T> | null = null;
    let savedThis: unknown = null;

    function wrapper(this: unknown, ...args: Parameters<T>) {
        savedThis = this;
        savedArgs = args;

        if (timerId !== null) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            timerId = null;
            if (savedArgs !== null) {
                func.apply(savedThis, savedArgs);
            }
        }, ms);
    }

    return wrapper;
}
