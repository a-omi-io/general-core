import ManagerError from "../Manager.error";

/**
 * Type guard that checks if a value is a {@link ManagerError}.
 * Optionally narrows to a specific subclass.
 *
 * @example
 *   try { await call(); }
 *   catch (e) {
 *     if (isManagerError(e, FetchError)) console.warn(e.statusCode);
 *   }
 */
const isManagerError = <T extends ManagerError = ManagerError>(
    value: unknown,
    ctor?: new (...args: Array<never>) => T
): value is T => {
    if (!(value instanceof ManagerError)) return false;
    if (ctor && !(value instanceof ctor)) return false;
    return true;
};

export default isManagerError;
