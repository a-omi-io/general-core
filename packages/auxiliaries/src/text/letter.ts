/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @param restLowercase - Whether or not to convert the rest of the string to lowercase.
 * @returns The capitalized string.
 */
export function capitalizeFirstLetter(
    str: string,
    restLowercase = false
): string {
    if (!str || typeof str !== "string") {
        return str;
    }

    const firstLetter = str.charAt(0).toUpperCase();
    const rest = restLowercase ? str.slice(1).toLowerCase() : str.slice(1);

    return firstLetter + rest;
}
