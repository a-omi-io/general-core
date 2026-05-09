import ManagerError from "../Manager.error";

/**
 * Custom error class for invalid text input.
 * @extends ManagerError
 */
class InvalidTextError extends ManagerError {
    /**
     * @param message The error message.
     */
    constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = "InvalidTextError";
    }
}

export default InvalidTextError;
