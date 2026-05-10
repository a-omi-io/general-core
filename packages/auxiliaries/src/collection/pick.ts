/**
 * Returns a shallow copy of an object containing only the specified keys.
 *
 * @param obj - Source object; if `undefined`, returns an empty object.
 * @param keys - Property names to include in the result.
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
    obj: T | undefined,
    keys: Array<K>
): Pick<T, K> {
    if (!obj) {
        return {} as Pick<T, K>;
    }

    const result = {} as Pick<T, K>;
    for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = obj[key];
        }
    }
    return result;
}
