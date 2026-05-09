import ManagerError from "./Manager.error";

/**
 * Custom error class for validation errors.
 * @extends ManagerError
 */
class ValidationError extends ManagerError {
    /**
     * @param message The error message.
     */
    constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = "ValidationError";
    }
}

export default ValidationError;
