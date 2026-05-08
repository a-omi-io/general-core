/**
 * Converts a given number to its equivalent unsigned 32-bit integer representation.
 * If the input number is negative, it wraps around to its positive unsigned counterpart.
 * If the number exceeds 32-bit limits, it wraps around modulo 2^32.
 *
 * @param {number} value - The number to be converted to an unsigned 32-bit integer.
 * @returns {number} The unsigned 32-bit integer representation of the input value.
 *
 * @example
 * // Example with a positive integer
 * toUnsigned32BitInteger(5); // returns 5
 *
 * @example
 * // Example with a negative integer (wraps around)
 * toUnsigned32BitInteger(-5); // returns 4294967291
 *
 * @example
 * // Example with a value exceeding the 32-bit unsigned integer limit (wraps around)
 * toUnsigned32BitInteger(4294967296); // returns 0
 */
export function toUnsigned32BitInteger(value: number) {
    return value >>> 0;
}
