/**
 * Best-effort extraction of a human-readable message from any thrown value.
 * Useful in `catch (e)` blocks where `e: unknown`.
 *
 * @example
 *   try { ... } catch (e) { logger.error(getErrorMessage(e)); }
 */
const getErrorMessage = (
    value: unknown,
    fallback = "Unknown error"
): string => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === "string") return value;
    if (value instanceof Error) return value.message || value.name || fallback;
    if (typeof value === "object" && "message" in value) {
        const message = (value as { message?: unknown }).message;
        if (typeof message === "string" && message.length > 0) return message;
    }
    try {
        return JSON.stringify(value);
    } catch {
        return fallback;
    }
};

export default getErrorMessage;
