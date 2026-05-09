/**
 * Wraps a value into the half-open interval `[0, period)`.
 *
 * @param value - The value to wrap (e.g. an angle or phase).
 * @param period - A strictly positive finite period (e.g. `360` for degrees).
 * @returns The wrapped value in `[0, period)`.
 */
export function wrapPeriodic(value: number, period: number): number {
    if (!Number.isFinite(period) || period <= 0) {
        throw new RangeError(
            "wrapPeriodic: period must be a finite number > 0"
        );
    }
    const wrapped = value % period;
    return wrapped < 0 ? wrapped + period : wrapped;
}
