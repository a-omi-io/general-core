/**
 * Delays execution for a specified number of milliseconds.
 * @param milliseconds - The number of milliseconds to delay execution.
 * @param result - The value to be resolved with after the delay.
 * @returns A promise that resolves after the specified delay time.
 */
export const delay = (
    milliseconds: number,
    result?: unknown
): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        if (milliseconds < 0)
            return reject(new Error("Negative delay time is invalid"));
        setTimeout(() => resolve(result), milliseconds);
    });
};
