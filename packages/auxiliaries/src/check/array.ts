/**
 * Determines if a given index is the last index of an array.
 * @param array - The array to check.
 * @param index - The index to check.
 * @returns True if the index is the last index of the array, false otherwise.
 * @throws "Index out of range" if the index is out of range.
 */
export function isLastIndexOfArray(
    array: Array<unknown>,
    index: number,
    throws: boolean = false
): boolean {
    if (index < 0 || index >= array.length) {
        if (throws) {
            throw new Error("Index out of range");
        } else {
            return false;
        }
    }
    return index === array.length - 1;
}
