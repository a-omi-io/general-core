/**
 * Linear interpolation between `a` and `b` by parameter `t` (typically in `[0, 1]`, unclamped).
 */
export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

/**
 * Inverse linear interpolation: maps `value` on the line through `a` and `b` to a parameter `t`.
 * When `a === b`, returns `0`.
 */
export function inverseLerp(a: number, b: number, value: number): number {
    if (a === b) {
        return 0;
    }
    return (value - a) / (b - a);
}

/**
 * Remaps `value` from the input range `[inMin, inMax]` to the output range `[outMin, outMax]`.
 * When `inMin === inMax`, returns `outMin`.
 */
export function remap(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number {
    if (inMin === inMax) {
        return outMin;
    }
    const t = (value - inMin) / (inMax - inMin);
    return lerp(outMin, outMax, t);
}

/** True when `|a - b| <= epsilon` (default small tolerance). */
export function approxEqual(
    a: number,
    b: number,
    epsilon: number = 1e-10
): boolean {
    return Math.abs(a - b) <= epsilon;
}
