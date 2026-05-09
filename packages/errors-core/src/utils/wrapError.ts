import ManagerError from "../Manager.error";
import getErrorMessage from "./getErrorMessage";

/**
 * Constructor signature compatible with any concrete {@link ManagerError}
 * subclass that takes `(message, cause)` as the first two parameters.
 */
export type ManagerErrorCtor<T extends ManagerError> = new (
    message: string,
    cause?: unknown
) => T;

/**
 * Wraps an arbitrary unknown value into the given {@link ManagerError}
 * subclass, preserving the original value as `cause`. If the value is already
 * an instance of `ErrorClass`, it is returned unchanged.
 *
 * @example
 *   try { await fetchUser(); }
 *   catch (e) { throw wrapError(e, FetchError, "Failed to fetch user"); }
 */
const wrapError = <T extends ManagerError>(
    value: unknown,
    ErrorClass: ManagerErrorCtor<T>,
    message?: string
): T => {
    if (value instanceof ErrorClass) return value;
    return new ErrorClass(message ?? getErrorMessage(value), value);
};

export default wrapError;
