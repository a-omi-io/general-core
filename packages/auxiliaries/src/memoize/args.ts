/**
 * Creates a unique key for an array of arguments.
 * If the array contains a single string, that string is returned as the key.
 * Otherwise, the arguments are stringified and returned as the key.
 */
const createArgsKey = <A extends Array<unknown>>(args: A): string => {
    if (args.length === 1 && typeof args[0] === "string") {
        return args[0] as string;
    }
    return JSON.stringify(args);
};

/**
 * Returns a memoized version of a function that caches results based on the function's arguments.
 * @param fn The function to memoize.
 * @returns A memoized version of the input function.
 */
export const memoizeArgs = <A extends Array<unknown>, R>(
    fn: (...args: A) => R
): ((...args: A) => R) => {
    const cache = new Map<string, R>();

    return (...args: A) => {
        const key = createArgsKey(args);

        if (cache.has(key)) {
            return cache.get(key) as R;
        }

        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

/**
 * Returns a memoized version of a function that caches results based on a single simple type argument.
 * @param fn The function to memoize.
 * @returns A memoized version of the input function.
 */
export const memoizeSimpleTypeArg = <A, R>(
    fn: (arg: A) => R
): ((arg: A) => R) => {
    const cache = new Map<A, R>();

    return (arg: A) => {
        if (cache.has(arg)) {
            return cache.get(arg) as R;
        }

        const result = fn(arg);
        cache.set(arg, result);
        return result;
    };
};
