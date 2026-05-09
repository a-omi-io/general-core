import safeSerialize from "./internal/safeSerialize";

/**
 * JSON-friendly representation of a {@link ManagerError}.
 */
export interface ISerializedManagerError {
    name: string;
    message: string;
    stack?: string;
    cause?: unknown;
    [extra: string]: unknown;
}

type CaptureStackTrace = (target: object, ctor?: object) => void;

const captureStackTrace = (
    Error as unknown as { captureStackTrace?: CaptureStackTrace }
).captureStackTrace;

/**
 * Abstract custom error class that serves as a base for all package errors.
 *
 * Features:
 *  - Preserves the constructor `name` (instead of inherited `"Error"`).
 *  - Stores `cause` regardless of runtime support for the ES2022 form.
 *  - Cleans up the stack trace on V8 (removes the constructor frame).
 *  - Restores the prototype chain so `instanceof` survives transpilation.
 *  - Provides safe, JSON-friendly `toJSON()` that handles cycles and
 *    non-serializable primitives (BigInt, Symbol, Function).
 *
 * @abstract
 */
abstract class ManagerError extends Error {
    public readonly cause?: unknown;

    constructor(message: string, cause?: unknown) {
        super(message);
        this.name = this.constructor.name;
        this.cause = cause;

        if (typeof captureStackTrace === "function") {
            captureStackTrace(this, new.target);
        }

        Object.setPrototypeOf(this, new.target.prototype);
    }

    /**
     * Type guard that narrows an unknown value to a {@link ManagerError}.
     * Optionally narrows further to a specific subclass.
     *
     * @example
     *   if (ManagerError.is(err, FetchError)) { err.statusCode; }
     */
    public static is<T extends ManagerError = ManagerError>(
        value: unknown,
        ctor?: new (...args: Array<never>) => T
    ): value is T {
        if (!(value instanceof ManagerError)) return false;
        if (ctor && !(value instanceof ctor)) return false;
        return true;
    }

    public toString(): string {
        return `${this.name}: ${this.message}`;
    }

    public toJSON(): ISerializedManagerError {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            cause:
                this.cause !== undefined
                    ? safeSerialize(this.cause)
                    : undefined,
        };
    }
}

export default ManagerError;
