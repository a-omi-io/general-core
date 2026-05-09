import getErrorMessage from "./getErrorMessage";

/**
 * Coerces an unknown thrown value into an {@link Error} instance, preserving
 * the original value as `cause` when it is non-Error.
 *
 * @example
 *   try { ... } catch (e) { throw toError(e); }
 */
const toError = (value: unknown): Error => {
    if (value instanceof Error) return value;
    const error = new Error(getErrorMessage(value));
    if (value !== undefined && !(value instanceof Error)) {
        (error as Error & { cause?: unknown }).cause = value;
    }
    return error;
};

export default toError;
