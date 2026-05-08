/**
 * Clamps a given value between two bounds.
 *
 * This function ensures that the provided value is not less than the minimum
 * and not more than the maximum of the given bounds. It first determines the
 * minimum and maximum between the two boundary values and then clamps the value
 * within this range. If the value is less than the minimum, it returns the minimum;
 * if it's more than the maximum, it returns the maximum. Otherwise, it returns the
 * value itself.
 *
 * @param {number} value - The value to be clamped.
 * @param {number} a - One bound of the range.
 * @param {number} b - The other bound of the range.
 * @example
 *  const value1 = 5;
 *  const clampedValue1 = clamp(value1, 1, 10); // clampedValue1 will be 5
 * @example
 *  const value2 = -3;
 *  const clampedValue2 = clamp(value2, 0, 10); // clampedValue2 will be 0 (the minimum)
 * @example
 *  const value3 = 15;
 *  const clampedValue3 = clamp(value3, 1, 10); // clampedValue3 will be 10 (the maximum)
 * @returns {number} The clamped value.
 */
export function clamp(value: number, a: number, b: number) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return Math.min(Math.max(value, min), max);
}
