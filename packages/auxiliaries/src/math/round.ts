/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param value - The number to be rounded.
 * @param decimalPlaces - The number of decimal places to round to.
 * @returns The rounded number.
 */
export function roundToDecimalPlaces(
    value: number,
    decimalPlaces: number
): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(value * factor) / factor;
}
