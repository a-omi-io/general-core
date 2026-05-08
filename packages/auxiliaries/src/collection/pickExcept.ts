/**
 * Creates a new object with all properties from the original object except for the specified ones.
 *
 * @param obj - The original object from which to exclude properties. Can be `undefined`.
 * @param excludes - An array of key names (properties) to exclude from the result.
 * @returns A new object with all properties from the original object except for the ones specified in `propsToExclude`.
 *         If the original object is `undefined`, returns an empty object.
 *
 * @example
 * ```typescript
 * const user = { name: 'Alice', age: 30, email: '[email address removed]' };
 * const userWithoutEmail = pickExcept(user, ['email']);
 * console.log(userWithoutEmail); // Output: { name: 'Alice', age: 30 }
 * ```
 */
export function pickExcept<T extends Record<string, any>, K extends keyof T>(
    obj: T | undefined,
    excludes: Array<K>
): Omit<T, K> {
    if (!obj) {
        return {} as Omit<T, K>; // Return empty object if original object is undefined
    }

    const result: Record<string, unknown> = {};
    for (const prop in obj) {
        if (!excludes.includes(prop as unknown as K)) {
            result[prop] = obj[prop];
        }
    }
    return result as Omit<T, K>;
}
