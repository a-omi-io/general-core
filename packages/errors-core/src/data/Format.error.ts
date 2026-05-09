import ManagerError from "../Manager.error";

/**
 * Custom error class for format errors.
 * @extends ManagerError
 */
class FormatError extends ManagerError {
    /**
     * @param message The error message.
     */
    constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = "FormatError";
    }
}

export default FormatError;
