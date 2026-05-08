import { echo } from "../log/echo";

/**
 * Measures the time it takes to execute a given function and logs the duration.
 * @param func - The function to measure the execution time of.
 * @param args - Arguments to be passed to the function.
 * @returns The result of the function call.
 */
export function measureExecutionTime<A extends Array<any>, R>(
    func: (...args: A) => R,
    ...args: A
): R {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    const durationMs = end - start;
    const durationSec = durationMs * 0.001;

    echo(
        `Execution time: ${durationMs.toFixed(2)}ms (${durationSec.toFixed(
            8
        )}s)`
    );

    return result;
}
