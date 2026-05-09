/**
 * Internal: deeply serializes any thrown value into a JSON-safe shape.
 *
 *  - Calls `toJSON()` when present (so {@link ManagerError} instances are
 *    properly serialized via their own contract).
 *  - Extracts `name`/`message`/`stack`/`cause` for plain `Error` values.
 *  - Coerces BigInt/Symbol/Function to strings.
 *  - Breaks cycles via a `WeakSet`.
 *  - Iterates own enumerable keys for plain objects and arrays.
 *
 * This module is intentionally framework-free and has no internal imports
 * (besides standard types) so it can be reused by both `ManagerError.toJSON`
 * and the `serializeError` utility without creating a cycle.
 */

type AnyFunction = (...args: ReadonlyArray<unknown>) => unknown;

const hasToJSON = (
    value: object
): value is { toJSON: (...args: ReadonlyArray<unknown>) => unknown } =>
    typeof (value as { toJSON?: unknown }).toJSON === "function";

const safeSerialize = (
    value: unknown,
    seen: WeakSet<object> = new WeakSet()
): unknown => {
    if (value === null || value === undefined) return value;
    const t = typeof value;
    if (t === "string" || t === "number" || t === "boolean") return value;
    if (t === "bigint") return `${(value as bigint).toString()}n`;
    if (t === "symbol") return (value as symbol).toString();
    if (t === "function") {
        return `[Function: ${(value as AnyFunction).name || "anonymous"}]`;
    }
    if (t !== "object") return String(value);

    const obj = value as object;
    if (seen.has(obj)) return "[Circular]";
    seen.add(obj);

    if (hasToJSON(obj)) {
        const json = obj.toJSON();
        if (json !== obj) return safeSerialize(json, seen);
    }

    if (value instanceof Error) {
        const errCause = (value as { cause?: unknown }).cause;
        return {
            name: value.name,
            message: value.message,
            stack: value.stack,
            cause:
                errCause !== undefined
                    ? safeSerialize(errCause, seen)
                    : undefined,
        };
    }

    if (Array.isArray(value)) {
        return value.map(v => safeSerialize(v, seen));
    }

    const out: Record<string, unknown> = {};
    for (const key of Object.keys(obj)) {
        out[key] = safeSerialize((obj as Record<string, unknown>)[key], seen);
    }
    return out;
};

export default safeSerialize;
