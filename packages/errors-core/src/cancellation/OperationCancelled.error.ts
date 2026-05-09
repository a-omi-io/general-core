import ManagerError from "../Manager.error";

/**
 * Error raised when an operation has been cancelled (e.g. by an
 * {@link AbortSignal}). Mirrors the role of DOMException "AbortError".
 *
 * @extends ManagerError
 */
class OperationCancelledError extends ManagerError {
    /**
     * Optional reason supplied by the caller (e.g. `AbortSignal.reason`).
     */
    public readonly reason?: unknown;

    /**
     * @param message The error message.
     * @param reason Optional reason supplied by the caller.
     */
    constructor(
        message = "Operation cancelled",
        reason?: unknown,
        cause?: unknown
    ) {
        super(message, cause);
        this.name = "OperationCancelledError";
        this.reason = reason;
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            reason: this.reason,
        };
    }
}

export default OperationCancelledError;
