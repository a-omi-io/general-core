export type DecimalRoundingMode = "round" | "floor" | "ceil";

export interface IQuantizeDecimalsOptions {
    mode?: DecimalRoundingMode;
    decimals?: number;
}

/**
 * Quantizes a number to a fixed number of decimal places using round, floor, or ceil.
 *
 * @param value - The value to quantize.
 * @param options - `mode` defaults to `"round"`; `decimals` defaults to `0`.
 */
export function quantizeToDecimals(
    value: number,
    options?: IQuantizeDecimalsOptions
): number {
    const mode = options?.mode ?? "round";
    const decimals = options?.decimals ?? 0;
    const factor = 10 ** decimals;
    const scaled = value * factor;
    const rounded =
        mode === "floor"
            ? Math.floor(scaled)
            : mode === "ceil"
              ? Math.ceil(scaled)
              : Math.round(scaled);
    return rounded / factor;
}
