import safeSerialize from "../internal/safeSerialize";
import { ISerializedManagerError } from "../Manager.error";

/**
 * Result of serializing an arbitrary thrown value.
 */
export interface ISerializedError {
    name: string;
    message: string;
    stack?: string;
    cause?: unknown;
    [extra: string]: unknown;
}

export type SerializedError = ISerializedManagerError | ISerializedError;

/**
 * Universal, JSON-safe serializer for any thrown value.
 * Handles Errors, ManagerErrors, plain objects, primitives, BigInt, Symbol,
 * Function, cycles and arrays.
 *
 * @example
 *   logger.error(JSON.stringify(serializeError(err)));
 */
const serializeError = (value: unknown): SerializedError => {
    const result = safeSerialize(value);
    if (
        result &&
        typeof result === "object" &&
        "name" in result &&
        "message" in result
    ) {
        return result as SerializedError;
    }
    return {
        name: "NonError",
        message:
            typeof result === "string"
                ? result
                : (JSON.stringify(result) ?? String(result)),
    };
};

export default serializeError;
