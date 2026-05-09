import ManagerError from "../Manager.error";

/**
 * Error raised when an operation exceeds its configured deadline.
 *
 * @extends ManagerError
 */
class TimeoutError extends ManagerError {
    /**
     * The timeout duration that was exceeded, in milliseconds.
     */
    public readonly timeoutMs?: number;

    /**
     * @param message The error message.
     * @param timeoutMs The configured timeout in milliseconds.
     */
    constructor(message: string, timeoutMs?: number, cause?: unknown) {
        super(message, cause);
        this.name = "TimeoutError";
        this.timeoutMs = timeoutMs;
    }

    public toString(): string {
        return this.timeoutMs !== undefined
            ? `${this.name} (${this.timeoutMs}ms): ${this.message}`
            : `${this.name}: ${this.message}`;
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            timeoutMs: this.timeoutMs,
        };
    }
}

export default TimeoutError;
