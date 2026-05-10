import { pickExcept } from "./pickExcept";

/**
 * Omits selected keys from a shallow copy of the object (alias of {@link pickExcept}).
 *
 * @param obj - Source object; if `undefined`, returns an empty object.
 * @param keys - Property names to exclude from the result.
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
    obj: T | undefined,
    keys: Array<K>
): Omit<T, K> {
    return pickExcept(obj, keys);
}
